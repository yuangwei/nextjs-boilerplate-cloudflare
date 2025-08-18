import appConfig from '@@/app.config';
import * as Icon from '@tabler/icons-react';
import Link from 'next/link';

import Logo from './logo';
import ThemeToggle from './theme';

export default function FooterSection() {
  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2 flex flex-col">
            <Link href="/" aria-label="go home" className="block size-fit">
              <Logo />
            </Link>
            <div className="order-first flex flex-wrap mt-6 gap-4 text-sm md:order-last">
              {appConfig.socialLinks?.map((link, index) => {
                const XIcon = Icon[
                  link.icon as keyof typeof Icon
                ] as React.ElementType;
                return (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X/Twitter"
                    className="text-muted-foreground hover:text-primary block"
                  >
                    {XIcon && <XIcon className="size-5" />}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-3">
            {appConfig.footerMenus?.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium">{link.group}</span>
                {link.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary block duration-150"
                  >
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t py-6">
          <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} {appConfig.seo?.title}, All rights
            reserved
          </span>
          <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
