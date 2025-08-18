import appConfig from '@@/app.config';

export type Locale = string;

export const locales =
  appConfig.i18n?.locales?.map((locale) => locale.code) ?? [];

export const defaultLocale: Locale = appConfig.i18n?.defaultLocale ?? 'en';
