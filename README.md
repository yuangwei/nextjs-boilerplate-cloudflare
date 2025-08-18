# Next.js Website Starter

A modern, full-stack Next.js application starter template with comprehensive authentication, content management, and internationalization support.

## ✨ Features

- **🚀 Next.js 15** - Latest version with App Router
- **🔐 Authentication** - Complete auth system with Better Auth
- **📝 Content Management** - Blog and pages with Fumadocs & MDX
- **🌍 Internationalization** - Multi-language support with next-intl
- **🎨 Modern UI** - Beautiful components with shadcn/ui and Tailwind CSS
- **📧 Email System** - Transactional emails with Resend and React Email
- **🗄️ Database** - PostgreSQL with Drizzle ORM
- **🔒 Security** - CAPTCHA protection with Cloudflare Turnstile
- **⚡ Performance** - Optimized for speed and SEO
- **🎯 TypeScript** - Full type safety throughout

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Better Auth
- **Database**: PostgreSQL + Drizzle ORM
- **Content**: Fumadocs + MDX
- **Email**: Resend + React Email
- **Internationalization**: next-intl
- **Security**: Cloudflare Turnstile
- **Icons**: Lucide React + Tabler Icons

## 📋 Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database
- Resend account (for emails)
- Cloudflare account (for Turnstile CAPTCHA)
- Google Console project (for OAuth)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd nextjs-website-starter
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Authentication
BETTER_AUTH_SECRET="your-random-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email
RESEND_API_KEY="your-resend-api-key"

# CAPTCHA
TURNSTILE_SECRET_KEY="your-cloudflare-turnstile-secret"

# Application
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate database schema
pnpm db:generate

# Run migrations
pnpm db:migrate

# Or push schema directly (for development)
pnpm db:push
```

### 5. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

### App Configuration

Main configuration is in `app.config.ts`:

```typescript
const appConfig: AppConfig = {
  appPrefix: 'your-app-name',
  baseUrl: 'https://your-domain.com',
  seo: {
    title: 'Your App Title',
    description: 'Your app description',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      // Add more locales as needed
    ],
  },
  // ... other configurations
};
```

### Content Configuration

Content management configuration is in `source.config.ts` for blog and static pages.

### Authentication Setup

1. **Google OAuth**: Set up OAuth credentials in Google Console
2. **Turnstile**: Configure CAPTCHA in Cloudflare dashboard
3. **Database**: Ensure proper database schema is migrated

## 🔨 Development

### Available Scripts

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm format:check     # Check code formatting

# Database
pnpm db:generate      # Generate Drizzle schema
pnpm db:migrate       # Run database migrations
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Drizzle Studio
```

### Project Structure

```
├── app.config.ts          # Main app configuration
├── source.config.ts       # Content configuration
├── content/               # MDX content files
│   ├── blog/[locale]/     # Blog posts
│   └── page/[locale]/     # Static pages
├── locales/              # Internationalization files
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── layouts/      # Layout components
│   │   ├── auth/         # Authentication components
│   │   ├── email/        # Email templates
│   │   └── magicui/      # Custom UI components
│   ├── db/               # Database schema and connection
│   ├── lib/              # Utility functions and configurations
│   └── styles/           # Global styles
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on each push

### Other Platforms

This is a standard Next.js application and can be deployed to:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Any Node.js hosting provider

### Environment Variables for Production

Ensure all environment variables are properly configured in your production environment:

- `DATABASE_URL`: Your production PostgreSQL connection string
- `BETTER_AUTH_SECRET`: A secure random string for authentication
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Your OAuth credentials
- `RESEND_API_KEY`: Your Resend API key for email delivery
- `TURNSTILE_SECRET_KEY`: Your Cloudflare Turnstile secret
- `NEXT_PUBLIC_BASE_URL`: Your production domain URL

## 📖 Usage

### Adding Blog Posts

Create MDX files in `content/blog/[locale]/`:

```yaml
---
title: 'Your Blog Post Title'
description: 'Post description'
date: '2024-01-01'
tags: ['tag1', 'tag2']
featured: false
---
Your blog content in MDX format...
```

### Adding Static Pages

Create MDX files in `content/page/[locale]/`:

```yaml
---
title: 'Page Title'
description: 'Page description'
---
Your page content...
```

### Customizing Components

- Modify layout components in `src/components/layouts/`
- Add new UI components using shadcn/ui: `npx shadcn@latest add [component]`
- Customize styles in `src/styles/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🙏 Acknowledgments

This project is built on the shoulders of giants. Special thanks to these amazing open-source projects and teams:

- **[Better Auth](https://github.com/better-auth/better-auth)** - Modern authentication library for TypeScript
- **[Magic UI](https://magicui.design/)** - Beautiful, customizable React components
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautifully designed components built with Radix UI and Tailwind CSS
- **[Resend](https://resend.com/)** - Email API for developers
- **[Drizzle ORM](https://orm.drizzle.team/)** - TypeScript ORM that doesn't get in your way
- **[Fumadocs](https://fumadocs.vercel.app/)** - Modern documentation framework
- **[Next.js](https://nextjs.org/)** - The React framework for production
- **[Lucide](https://lucide.dev/)** & **[Tabler Icons](https://tabler.io/icons)** - Beautiful icon libraries
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization for Next.js

And many other incredible open-source contributors who make projects like this possible. 🚀

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using Next.js and modern web technologies.
