import { blog, page } from '@@/.source';
import appConfig from '@@/app.config';
import { I18nConfig } from 'fumadocs-core/i18n';
import { loader } from 'fumadocs-core/source';
import { createMDXSource } from 'fumadocs-mdx';

export const contentI18n: I18nConfig | undefined = appConfig.i18n
  ? {
      parser: 'dir',
      hideLocale: 'always',
      defaultLanguage: appConfig.i18n?.defaultLocale ?? 'en',
      languages: appConfig.i18n?.locales?.map((locale) => locale.code) ?? [],
    }
  : undefined;

export const blogSource = loader({
  i18n: contentI18n,
  baseUrl: '/blog',
  source: createMDXSource(blog),
});

export const pageSource = loader({
  i18n: contentI18n,
  baseUrl: '/page',
  source: createMDXSource(page),
});
