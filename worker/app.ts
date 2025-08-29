// @ts-ignore
import { default as handler } from "../.open-next/worker.js";
 
export default {
  fetch: handler.fetch,
} satisfies ExportedHandler<CloudflareEnv>;
 
// @ts-ignore
export { DOQueueHandler, DOShardedTagCache } from "../.open-next/worker.js";