import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/libsql";
import { cache } from "react";

import * as schema from "@/db/schema";
import { getEnv } from "@/lib/env";

export const getSqlite = cache(async () => {
  const env = await getEnv();

  return drizzle({
    connection: { url: env.DATABASE_URL!, authToken: env.DATABASE_AUTH_TOKEN! },
    schema,
  });
});
