# Claude AI Development Rules

This document contains the development rules and guidelines for working with the Next.js Website Starter project. These rules should be followed by any AI assistant or developer working on this codebase.

## Core Development Philosophy

- **Incremental progress over big bangs** - Make small, compilable changes
- **Learning from existing code** - Study patterns before implementing
- **Pragmatic over dogmatic** - Adapt to project reality
- **Clear intent over clever code** - Choose boring, obvious solutions
- **All code comments and default text must be in English** - Maintain consistency in documentation

## Project Architecture

### Directory Structure Rules

**Next.js App Router Structure:**

- Authentication pages in `src/app/auth/` (login, sign-up)
- Marketing/public pages in `src/app/` (home, blog, about)
- Dynamic routes use bracket notation: `[slug]`, `[page]`
- API routes in `src/app/api/` following REST conventions
- Protected app routes in `src/app/app/`

**Component Organization:**

- UI primitives in `src/components/ui/` (shadcn components only)
- Layout components in `src/components/layouts/` (logo, header, footer, theme)
- Feature-specific components in `src/components/[feature]/` (auth, content, email)
- MagicUI components in `src/components/magicui/`

**Configuration Rules:**

- Main config in `app.config.ts` with types from `app.config.d.ts`
- Content config in `source.config.ts` for fumadocs
- Environment variables accessed only within config files
- Use `@@/` alias for root directory imports

### Technology Stack Constraints

**Authentication & Database:**

- Use Better Auth for authentication (`better-auth`)
- Use Drizzle ORM with PostgreSQL
- Use Resend for email delivery
- Use Cloudflare Turnstile for CAPTCHA

**Content Management:**

- Use Fumadocs for blog/content (`fumadocs-core`, `fumadocs-mdx`)
- MDX files with frontmatter in `content/blog/[locale]/`
- Static pages in `content/page/[locale]/`
- Content collections defined in `source.config.ts`

**Internationalization:**

- Use `next-intl` for translations
- Configure locales in `app.config.ts` with `i18n` property
- Translation files in `locales/[locale].json`
- Use nested objects: `{ "auth": { "login": "Login" } }`

## Code Quality Standards

### TypeScript Rules

- Always use proper TypeScript types, never `any`
- Use interfaces from `app.config.d.ts` for configurations
- Implement proper error handling with descriptive messages
- Use type-safe environment variable access

### React & Next.js Rules

- Use server components by default, client components only when needed
- Mark client components with `'use client'` directive
- Use `async/await` for server-side data fetching
- Implement proper loading and error states

### Styling Rules

- Use Tailwind CSS exclusively for styling
- Use `cn()` utility from `@/lib/utils` for conditional classes
- Follow CSS variables for theme-aware styling
- Use design tokens from `src/styles/globals.css`

### Component Rules

- Use shadcn/ui components as base primitives
- Install new components with: `npx shadcn@latest add [component-name]`
- Use Lucide React for icons (`lucide-react`)
- Use Tabler React for icons (`@tabler/icons-react`)
- Follow composition over inheritance pattern

## Implementation Guidelines

### Configuration System

```typescript
// Use typed config object
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
  seo: { title: 'App Title', description: 'App Description' },
};
```

### Blog Content Rules

```yaml
# Required MDX frontmatter
title: 'Required - Article title'
description: 'Required - Article description'
date: 'Required - YYYY-MM-DD format'
tags: ['Optional - Array of tags']
featured: false # Optional - Boolean
readTime: 'Optional - e.g., "5 min read"'
author: 'Optional - Author name'
```

### Authentication Implementation

- Cookie prefix must match `appConfig.appPrefix`
- Use `sendWelcomeEmail()` on successful registration
- Implement CAPTCHA on sign-up and login endpoints with Cloudflare Turnstile
- Support Google OAuth with proper configuration
- Better Auth configuration in `src/lib/auth.ts`

### Email Templates

- Use React Email components in `src/components/email/`
- Configure Resend in `src/lib/email.ts`
- Welcome email component: `sign-up-success.tsx`

## File Creation Rules

### When creating new files:

**Components:**

- UI components go in `src/components/ui/[component].tsx`
- Layout components go in `src/components/layouts/[component].tsx`
- Feature components go in `src/components/[feature]/[component].tsx`

**Pages:**

- Use proper Next.js App Router structure
- Server components for data fetching
- Client components for interactivity

**API Routes:**

- Follow REST conventions in `src/app/api/`
- Implement proper error handling
- Use Better Auth for authentication endpoints

## Import Rules

### Import Patterns:

```typescript
// Config imports (use @@/ for root)
import appConfig from '@@/app.config';
import { AppConfig } from '@@/app.config.d';

import Logo from '@/components/layouts/logo';
// Component imports
import { Button } from '@/components/ui/button';
// Content imports
import { blogSource, pageSource } from '@/lib/content';
// Utility imports
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/utils';
```

## Environment Variables

### Required Environment Variables:

```bash
# Database
DATABASE_URL="postgresql://..."

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
RESEND_API_KEY="your-resend-api-key"

# CAPTCHA
TURNSTILE_SECRET_KEY="your-cloudflare-turnstile-secret"

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## Testing & Quality

### Before Every Commit:

- [ ] Code compiles successfully
- [ ] All tests pass
- [ ] No linter/formatter warnings
- [ ] Environment variables properly configured
- [ ] No hardcoded values, use config system

### Code Review Checklist:

- [ ] Uses existing patterns and conventions
- [ ] Proper TypeScript types
- [ ] Follows directory structure rules
- [ ] Uses config system for settings
- [ ] Implements proper error handling

## Security Rules

- Never commit environment variables
- Use type-safe environment variable validation
- Implement proper CORS and CSRF protection
- Use HTTPS in production
- Implement rate limiting for auth endpoints

## Common Patterns

### Config Usage:

```typescript
// Direct config access
import appConfig from '@@/app.config';

const title = appConfig.seo?.title;
const isI18nEnabled = Boolean(appConfig.i18n);
const locales = appConfig.i18n?.locales || [];
```

### Blog Data Fetching:

```typescript
import { getLocale } from 'next-intl/server';

import { blogSource } from '@/lib/content';

const locale = await getLocale();
const allPages = blogSource.getPages(locale);
```

### Authentication:

```typescript
import { auth } from '@/lib/auth';

// Server component
const session = await auth.api.getSession({ headers });

// Client component
import { useSession } from '@/lib/auth.client';
const { data: session } = useSession();
```

## Language and Documentation Rules

- **All code comments must be written in English** regardless of the target audience
- **All variable names, function names, and identifiers must be in English**
- **All commit messages must be in English**
- **All documentation files (README, API docs, etc.) must be in English**
- **Default text in UI components should be in English** (use i18n for translations)
- **Error messages and log outputs should be in English**

This ensures consistency and maintainability across the codebase, making it accessible to international developers and following industry best practices.

---

Remember: Always study existing implementations before creating new features. The codebase has established patterns that should be followed for consistency.
