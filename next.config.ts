// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
    loader: "custom",
    loaderFile: "./scripts/image-loader.ts",
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
