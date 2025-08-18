import appConfig from '@@/app.config';
import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: appConfig.baseUrl,
      images: '/og.png',
      siteName: appConfig.seo?.title,
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@money_is_shark',
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: '/og.png',
      ...override.twitter,
    },
    alternates: {
      canonical: appConfig.baseUrl,
      types: {
        'application/rss+xml': [
          {
            title: appConfig.seo?.title,
            url: `${appConfig.baseUrl}/blog/rss.xml`,
          },
        ],
      },
      ...override.alternates,
    },
  };
}
