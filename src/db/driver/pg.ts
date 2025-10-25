import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/node-postgres";
import { cache } from "react";
import { Pool } from "pg";

import * as schema from "@/db/schema";
import { getEnv } from "@/lib/env";

export const getPostgres = cache(async () => {
  let connectionString: string;
  const env = await await getEnv();
  if (env.NEXTJS_ENV === "development") {
    connectionString = env.DATABASE_URL!;
  } else {
    // @ts-ignore
    connectionString = env.HYPERDRIVE.connectionString;
  }

  const pool = new Pool({
    connectionString,
    maxUses: 1,
  });
  return drizzle({ client: pool, schema });
});
