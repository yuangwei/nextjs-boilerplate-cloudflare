export interface ConfigMethods<T> {
  getConfig<K extends keyof T>(key: K): T[K];
  isConfigEnabled(key: keyof T): boolean;
  hasConfig(key: keyof T): boolean;
  updateConfig<K extends keyof T>(key: K, value: Partial<T[K]>): void;
}

export type ConfigWithMethods<T> = T & ConfigMethods<T>;

export interface LocaleConfig {
  code: string;
  name: string;
  flag?: string;
}

export interface I18nConfig {
  defaultLocale?: string;
  locales?: LocaleConfig[];
}

export interface ThemeConfig {
  defaultTheme?: 'light' | 'dark' | 'system';
}

export interface SeoConfig {
  title: string;
  description: string;
  logo?: React.ReactNode;
  keywords?: string[];
  author?: string;
  creator?: string;
  publisher?: string;
}

export interface AppConfig {
  appPrefix: string;
  baseUrl: string;
  content?: boolean;
  theme?: ThemeConfig;
  seo?: SeoConfig;
  i18n?: I18nConfig;
  headerMenus?: Array<{
    name: string;
    href: string;
    external?: boolean;
  }>;
  footerMenus?: Array<{
    group: string;
    items: Array<{
      name: string;
      href: string;
      external?: boolean;
    }>;
  }>;
  socialLinks?: Array<{
    name: string;
    href: string;
    icon: string;
  }>;
}
