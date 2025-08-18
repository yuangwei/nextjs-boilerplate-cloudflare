'use server';

import appConfig from '@@/app.config';
import { cookies } from 'next/headers';

import { Locale, defaultLocale } from '@/i18n';

const COOKIE_NAME = `${appConfig.appPrefix}_i18n`;

export async function getUserLocale() {
  return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(COOKIE_NAME, locale);
}
