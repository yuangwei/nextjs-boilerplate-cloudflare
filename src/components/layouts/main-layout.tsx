import appConfig from '@@/app.config';
import { RootProvider } from 'fumadocs-ui/provider';
import { getLocale } from 'next-intl/server';

async function I18NLayout({ children }: { children: React.ReactNode }) {
  const locale = appConfig.i18n ? await getLocale() : 'en';
  return <html lang={locale}>{children}</html>;
}

async function DocumentLayout({ children }: { children: React.ReactNode }) {
  const locale = appConfig.i18n ? await getLocale() : 'en';
  const i18nEnabled = appConfig.i18n;
  return (
    <RootProvider
      i18n={
        i18nEnabled
          ? {
              locale,
              locales: appConfig.i18n?.locales?.map((locale) => ({
                locale: locale.code,
                name: locale.name,
              })),
              translations: {
                cn: {
                  search: 'Translated Content',
                },
              }[locale],
            }
          : undefined
      }
    >
      {children}
    </RootProvider>
  );
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18NLayout>
      <DocumentLayout>{children}</DocumentLayout>
    </I18NLayout>
  );
}
