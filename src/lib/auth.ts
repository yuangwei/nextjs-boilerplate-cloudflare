import appConfig from '@@/app.config';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { captcha, oneTap } from 'better-auth/plugins';

import { db } from '@/db';
import * as schema from '@/db/schema';

export const auth = betterAuth({
  advanced: {
    cookiePrefix: appConfig.appPrefix,
  },
  emailAndPassword: {
    enabled: true,
    // sendWelcomeEmail: (user) => sendWelcomeEmail(user.email),
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
    },
  }),
  plugins: [
    nextCookies(),
    oneTap(),
    captcha({
      provider: 'cloudflare-turnstile',
      secretKey: process.env.TURNSTILE_SECRET_KEY!,
      endpoints: ['/sign-up/email', '/login/email'],
    }),
  ],
});
