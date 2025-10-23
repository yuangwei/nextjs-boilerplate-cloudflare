import { betterAuth, User } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { stripe } from "@better-auth/stripe";

import { getDb } from "@/db";
import { getEnv } from "./env";
import { getStripeClient, subscribePlan } from "./stripe";

let cachedAuth: ReturnType<typeof betterAuth> | null = null;

async function getAuth() {
	if (cachedAuth) {
		return cachedAuth;
	}

	const env = await getEnv();
	const db = await getDb();

	cachedAuth = betterAuth({
		secret: env.BETTER_AUTH_SECRET,
		database: drizzleAdapter(db, {
			provider: "pg",
		}),
		emailAndPassword: {
			enabled: true,
		},
		socialProviders: {
			google: {
				enabled: true,
				clientId: env.GOOGLE_CLIENT_ID!,
				clientSecret: env.GOOGLE_CLIENT_SECRET!,
			},
		},
		plugins: [
			nextCookies(),
			stripe({
				stripeClient: await getStripeClient(),
				stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET!,
				createCustomerOnSignUp: true,
				subscription: {
					enabled: true,
					plans: subscribePlan,
				},
			}),
		],
	});

	return cachedAuth;
}
/**
 * Get the current authenticated user from the session
 * Returns null if no user is authenticated
 */
export async function getCurrentUser(): Promise<User | null> {
	try {
		const auth = await getAuth();
		const session = await auth.api.getSession({
			headers: await headers(),
		});

		if (!session?.user) {
			return null;
		}
		// @ts-ignore
		return {
			id: session.user.id,
			name: session.user.name,
			email: session.user.email,
		};
	} catch (error) {
		console.error("Error getting current user:", error);
		return null;
	}
}

/**
 * Get the current authenticated user or throw an error
 * Use this when authentication is required
 */
export async function requireAuth(): Promise<User> {
	const user = await getCurrentUser();

	if (!user) {
		throw new Error("Authentication required");
	}

	return user;
}

/**
 * Check if a user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
	const user = await getCurrentUser();
	return user !== null;
}

/**
 * Get the auth instance for use in server actions and API routes
 */
export async function getAuthInstance() {
	return await getAuth();
}

/**
 * Get session information
 */
export async function getSession() {
	try {
		const auth = await getAuth();
		return await auth.api.getSession({
			headers: await headers(),
		});
	} catch (error) {
		console.error("Error getting session:", error);
		return null;
	}
}

export const auth = await getAuth();
