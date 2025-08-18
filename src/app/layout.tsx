import appConfig from '@@/app.config';
import { Toaster } from 'sonner';

import MainLayout from '@/components/layouts/main-layout';
import { geistMono, geistSans } from '@/lib/fonts';
import { createMetadata } from '@/lib/seo';
import '@/styles/globals.css';

export async function generateMetadata() {
  return createMetadata({
    title: {
      default: appConfig.seo?.title ?? 'App',
      template: `%s | ${appConfig.seo?.title ?? 'App'}`,
    },
    description: appConfig.seo?.description,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </MainLayout>
  );
}
