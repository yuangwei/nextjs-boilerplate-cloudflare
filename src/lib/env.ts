import { getCloudflareContext } from "@opennextjs/cloudflare";

export const getEnv = async () => {
	if (process.env.NODE_ENV === "development") {
		const dotenv = await import("dotenv");
		dotenv.config({ path: ".dev.vars" });
		return process.env;
	}
	const { env } = await getCloudflareContext({ async: true });
	return env;
};
