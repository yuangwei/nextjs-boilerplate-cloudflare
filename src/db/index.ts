import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { cache } from "react";
import { Pool } from "pg";

import * as schema from "./schema";

export const getDb = cache(async () => {
	let connectionString: string;
	if (process.env.NODE_ENV === "development") {
		const dotenv = await import("dotenv");
		dotenv.config({ path: ".dev.vars" });
		connectionString = process.env.DATABASE_URL!;
	} else {
		const { env } = await getCloudflareContext({ async: true });
		// @ts-ignore
		connectionString = env.HYPERDRIVE.connectionString;
	}

	const pool = new Pool({
		connectionString,
		maxUses: 1,
	});
	return drizzle({ client: pool, schema });
});
