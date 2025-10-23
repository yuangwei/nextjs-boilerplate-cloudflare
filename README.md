# Next.js Cloudflare Workers Boilerplate

A modern, production-ready Next.js 15.4.6 application with React 19, configured to deploy on Cloudflare Workers using the OpenNext Cloudflare adapter. Includes authentication, database integration, and file storage capabilities.

## 🚀 Features

- **⚡ Next.js 15.4.6** with React 19 and App Router
- **🔐 Authentication** - Complete auth system with better-auth, supporting email/password and Google OAuth
- **🗄️ Database** - PostgreSQL with Drizzle ORM and Cloudflare Hyperdrive acceleration
- **📁 File Storage** - Cloudflare R2 integration with automatic metadata handling
- **🎨 Modern UI** - Tailwind CSS v4 with shadcn/ui components
- **🔧 Developer Experience** - TypeScript, Biome formatter/linter, Git hooks, and hot reload
- **🌍 Edge Deployment** - Global CDN performance with Cloudflare Workers

## 🤖 AI-Friendly

This template is designed to work seamlessly with AI development tools like Claude Code. It includes comprehensive documentation in `CLAUDE.md` with detailed development guidelines, architecture explanations, and coding standards to help AI assistants understand and contribute effectively to your project.

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15.4.6** with React 19 - Latest version with App Router
- **TypeScript** - Strict configuration with path aliases
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Cloudflare Workers** - Serverless deployment platform via OpenNext

### Authentication & Database
- **better-auth v1.3.29** - Modern authentication solution
- **Drizzle ORM v0.44.6** - Type-safe SQL toolkit
- **PostgreSQL** - Primary database with Cloudflare Hyperdrive
- **Google OAuth** - Social authentication provider

### UI & Development
- **shadcn/ui** - Component library built on Radix UI
- **Biome** - Modern linter and formatter
- **Husky** - Git hooks for code quality
- **Drizzle Kit** - Database migrations and management

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with font configuration
│   ├── page.tsx           # Homepage
│   └── api/[...auth]/     # Better-auth API route
├── components/ui/         # shadcn/ui components
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # Server-side auth configuration
│   ├── auth-client.tsx   # Client-side auth setup
│   ├── env.ts            # Environment handling
│   ├── storage.ts        # R2 file storage utilities
│   └── utils.ts          # General utilities
├── db/                   # Database layer
│   ├── index.ts          # Database connection setup
│   └── schema/           # Database schemas
└── styles/
    └── globals.css       # Global styles with Tailwind v4
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Cloudflare account with Workers, R2, and Hyperdrive
- PostgreSQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd nextjs-boilerplate-cloudflare
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .dev.vars.example .dev.vars
   ```

   Edit `.dev.vars` with your configuration:
   ```env
   DATABASE_URL=postgresql://your-database-url
   BETTER_AUTH_SECRET=your-auth-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Set up the database:**
   ```bash
   pnpm db:generate  # Generate migrations
   pnpm db:migrate   # Run migrations
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📝 Available Scripts

### Development
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm validate` - Run all quality checks (type-check, lint, format:check, build)

### Database Operations
- `pnpm db:generate` - Generate database migrations
- `pnpm db:migrate` - Run database migrations
- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio for database management

### Authentication Operations
- `pnpm auth:generate` - Generate better-auth client types
- `pnpm auth:migrate` - Run auth-specific migrations

### Code Quality
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check code formatting without changes
- `pnpm type-check` - Run TypeScript type checking

## 🚀 Deployment

### Deploy to Cloudflare Workers

1. **Build and deploy:**
   ```bash
   pnpm deploy
   ```

2. **Preview locally before deployment:**
   ```bash
   pnpm preview
   ```

3. **Generate Cloudflare types:**
   ```bash
   pnpm cf-typegen
   ```

### Environment Setup

#### Development
Uses `.dev.vars` file for local development environment variables.

#### Production
Configure environment variables in your Cloudflare Workers dashboard or via Wrangler:

```bash
wrangler secret put DATABASE_URL
wrangler secret put BETTER_AUTH_SECRET
wrangler secret put GOOGLE_CLIENT_ID
wrangler secret put GOOGLE_CLIENT_SECRET
```

## 🔧 Configuration

### Core Configuration Files
- `next.config.ts` - Next.js with Cloudflare dev initialization
- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext adapter configuration
- `drizzle.config.ts` - Database migration configuration
- `biome.json` - Code formatting and linting rules
- `components.json` - shadcn/ui component configuration

### Cloudflare Resources Required
- **Workers** - For application deployment
- **R2 Bucket** - For file storage
- **Hyperdrive** - For database connection acceleration
- **Pages** (optional) - For custom domain and SSL

## 📚 Usage Examples

### Authentication

```typescript
// Server-side auth
import { getCurrentUser, requireAuth } from '@/lib/auth'

// Get current user
const user = await getCurrentUser()

// Protect routes
export default async function ProtectedPage() {
  const session = await requireAuth()
  // User is authenticated
}
```

```typescript
// Client-side auth
import { authClient } from '@/lib/auth-client'

// Sign in
await authClient.signIn.email({
  email: 'user@example.com',
  password: 'password'
})

// Sign in with Google
await authClient.signIn.social({ provider: 'google' })
```

### Database Operations

```typescript
import { db } from '@/db'
import { users } from '@/db/schema'

// Query users
const allUsers = await db.select().from(users)

// Create user
const newUser = await db.insert(users).values({
  email: 'user@example.com',
  name: 'John Doe'
}).returning()
```

### File Storage

```typescript
import { uploadFile, getPublicUrl } from '@/lib/storage'

// Upload file
const result = await uploadFile(file, 'user-uploads')

// Get public URL
const url = getPublicUrl(result.key)
```

## 🎨 UI Components

This project uses shadcn/ui components. Add new components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
# ... more components
```

## 🔒 Security Features

- **Secure Authentication** - Better-auth with session management
- **Environment Variables** - Proper secret management
- **Type Safety** - TypeScript throughout the application
- **Input Validation** - Server-side validation for all inputs
- **CSRF Protection** - Built-in with better-auth
- **Content Security Policy** - Configurable security headers

## 🧪 Testing

The project is set up for testing. Add your test files in the appropriate directories and run:

```bash
pnpm test          # Run tests
pnpm test:watch    # Run tests in watch mode
pnpm test:coverage # Run tests with coverage
```

## 📖 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive development guide for AI assistants
- **[API Documentation](#)** - Add your API documentation here
- **[Component Docs](#)** - Add component documentation here

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the conventional commit format and ensure all quality checks pass.

## 📄 License

[License](LICENSE) - See LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [CLAUDE.md](CLAUDE.md) file for development guidelines
2. Review existing [Issues](../../issues)
3. Create a new issue with detailed information

---

**Built with ❤️ for modern web development on Cloudflare's edge platform**