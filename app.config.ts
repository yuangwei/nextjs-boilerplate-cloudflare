import { AppConfig } from './app.config.d';
import packageJson from './package.json';

const appConfig: AppConfig = {
  appPrefix: packageJson.name,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  i18n: {
    defaultLocale: 'en',
    locales: [{ code: 'en', name: 'English', flag: '🇺🇸' }],
  },
  content: true,
  seo: {
    title: 'Scratch Starter',
    description: 'The library for building documentation sites',
  },
  headerMenus: [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQs', href: '/#faqs' },
    { name: 'Blog', href: '/blog' },
  ],
  footerMenus: [
    { group: 'Features', items: [{ name: 'About', href: '#link' }] },
    { group: 'Solution', items: [{ name: 'About', href: '#link' }] },
    { group: 'Company', items: [{ name: 'About', href: '#link' }] },
    { group: 'Legal', items: [{ name: 'Privacy Policy', href: '#link' }] },
  ],
  socialLinks: [
    {
      name: 'Github',
      href: 'https://github.com/scratchstarterdev',
      icon: 'IconBrandGithub',
    },
    { name: 'X', href: '#link', icon: 'IconBrandX' },
    { name: 'Instagram', href: '#link', icon: 'IconBrandInstagram' },
  ],
};

export default appConfig;
