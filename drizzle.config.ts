import config from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config.config({ path: '.dev.vars' });

export default defineConfig({
  out: './migrations',
  schema: './src/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
