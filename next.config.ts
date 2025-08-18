import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import appConfig from './app.config';

const withNextIntl = createNextIntlPlugin();

const withMDX = createMDX();

let nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

const i18nEnabled = appConfig.i18n;
const contentEnabled = appConfig.content;

if (i18nEnabled) {
  nextConfig = withNextIntl(nextConfig);
}

if (contentEnabled) {
  nextConfig = withMDX(nextConfig);
}

export default nextConfig;
