# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern Next.js 15.4.6 application with React 19, configured to deploy on Cloudflare Workers using the OpenNext Cloudflare adapter. The project includes authentication, database integration, and file storage capabilities, serving as a production-ready foundation for full-stack applications.

## Tech Stack

### Core Framework
- **Next.js 15.4.6** with React 19 - Latest version with App Router
- **TypeScript** - Strict configuration with path aliases (`@/*` → `./src/*`)
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Cloudflare Workers** - Serverless deployment platform via OpenNext

### Authentication & Database
- **better-auth v1.3.29** - Modern authentication solution with PostgreSQL adapter
- **Drizzle ORM v0.44.6** - Type-safe SQL toolkit for database operations
- **PostgreSQL** - Primary database with Cloudflare Hyperdrive acceleration
- **Google OAuth** - Social authentication provider

### UI & Styling
- **shadcn/ui** - Component library built on Radix UI (New York style)
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Modern icon library
- **Geist Sans/Mono** - Default fonts from Vercel

### Development & Code Quality
- **Biome** - Modern linter and formatter (replacing ESLint/Prettier)
- **Husky** - Git hooks for pre-commit quality checks
- **Commitlint** - Conventional commit message enforcement
- **Drizzle Kit** - Database migrations and management

## Key Architecture

### Authentication System
- **better-auth** with complete setup including:
  - Email/password authentication
  - Google OAuth integration
  - Session management with secure cookies
  - Server-side auth utilities (`getCurrentUser`, `requireAuth`, `isAuthenticated`)
  - Client-side auth client for React components
- Auth API routes at `src/app/api/[...auth]/`
- Database schema for users, sessions, accounts, and verification

### Database Architecture
- PostgreSQL with Drizzle ORM
- Development: Direct `DATABASE_URL` connection
- Production: Cloudflare Hyperdrive for accelerated connections
- Auth schemas: users, sessions, accounts, verification tables
- Migration support via Drizzle Kit commands

### File Storage System
- Cloudflare R2 integration for file uploads
- Automatic filename generation with timestamps and random IDs
- Custom metadata support (original name, upload time, size)
- Public URL generation for served files
- Storage utilities in `src/lib/storage.ts`

### Multi-Environment Support
- Development: Uses `.dev.vars` for environment variables
- Production: Uses Cloudflare Workers environment
- Environment-aware configuration in `src/lib/env.ts`
- Seamless switching between local and production environments

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with font configuration
│   ├── page.tsx           # Homepage (currently minimal)
│   └── api/[...auth]/     # Better-auth API route
├── components/ui/         # shadcn/ui components
│   └── button.tsx         # Example button component
├── lib/                   # Utilities and configurations
│   ├── auth.ts           # Server-side auth configuration
│   ├── auth-client.tsx   # Client-side auth setup
│   ├── env.ts            # Environment handling
│   ├── fonts.ts          # Font definitions
│   ├── storage.ts        # R2 file storage utilities
│   └── utils.ts          # General utilities
├── db/                   # Database layer
│   ├── index.ts          # Database connection setup
│   └── schema/           # Database schemas
│       ├── index.ts      # Schema exports
│       └── auth.ts       # Auth tables (user, session, account, verification)
└── styles/
    └── globals.css       # Global styles with Tailwind v4
```

## Development Commands

### Core Development
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

### Deployment
- `pnpm deploy` - Build and deploy to Cloudflare Workers
- `pnpm preview` - Build and preview locally before deployment
- `pnpm cf-typegen` - Generate TypeScript types for Cloudflare environment

### Code Quality
- `pnpm lint` - Run Biome linter
- `pnpm format` - Format code with Biome
- `pnpm format:check` - Check code formatting without changes
- `pnpm type-check` - Run TypeScript type checking without emitting files

## Configuration Files

### Core Configuration
- `next.config.ts` - Next.js with Cloudflare dev initialization
- `wrangler.jsonc` - Cloudflare Workers configuration with R2 bucket setup
- `open-next.config.ts` - OpenNext adapter configuration
- `drizzle.config.ts` - Database migration configuration
- `biome.json` - Code formatting and linting rules
- `components.json` - shadcn/ui component configuration

### Environment Configuration
- `.dev.vars` - Development environment variables (DO NOT commit)
- Environment variables required:
  - `DATABASE_URL` - PostgreSQL connection string
  - `BETTER_AUTH_SECRET` - Secret for authentication
  - `GOOGLE_CLIENT_ID` - Google OAuth client ID
  - `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

## Philosophy

### Core Beliefs

- **Incremental progress over big bangs** - Small changes that compile and pass tests
- **Learning from existing code** - Study and plan before implementing
- **Pragmatic over dogmatic** - Adapt to project reality
- **Clear intent over clever code** - Be boring and obvious

### Simplicity Means

- Single responsibility per function/class
- Avoid premature abstractions
- No clever tricks - choose the boring solution
- If you need to explain it, it's too complex

## Process

### 1. Planning & Staging

Break complex work into 3-5 stages. Document in `docs/IMPLEMENTATION_PLAN.md`:

```markdown
## Stage N: [Name]

**Goal**: [Specific deliverable]
**Success Criteria**: [Testable outcomes]
**Tests**: [Specific test cases]
**Status**: [Not Started|In Progress|Complete]
```

- Update status as you progress
- Remove file when all stages are done

### 2. Implementation Flow

1. **Understand** - Study existing patterns in codebase
2. **Test** - Write test first (red)
3. **Implement** - Minimal code to pass (green)
4. **Refactor** - Clean up with tests passing
5. **Commit** - With clear message linking to plan

### 3. When Stuck (After 3 Attempts)

**CRITICAL**: Maximum 3 attempts per issue, then STOP.

1. **Document what failed**:
   - What you tried
   - Specific error messages
   - Why you think it failed

2. **Research alternatives**:
   - Find 2-3 similar implementations
   - Note different approaches used

3. **Question fundamentals**:
   - Is this the right abstraction level?
   - Can this be split into smaller problems?
   - Is there a simpler approach entirely?

4. **Try different angle**:
   - Different library/framework feature?
   - Different architectural pattern?
   - Remove abstraction instead of adding?

## Technical Standards

### Architecture Principles

- **Composition over inheritance** - Use dependency injection
- **Interfaces over singletons** - Enable testing and flexibility
- **Explicit over implicit** - Clear data flow and dependencies
- **Test-driven when possible** - Never disable tests, fix them

### Code Quality

- **Language Standards**:
  - All code comments and text content must be in English by default
  - Variable names, function names, and documentation should use English
  - Only use other languages when explicitly requested in the prompt
  - This ensures consistency and international accessibility

- **After generating code**:
  - Run `pnpm format` to ensure code formatting compliance
  - Verify code compiles and follows project conventions

- **Every commit must**:
  - Compile successfully
  - Pass all existing tests
  - Include tests for new functionality
  - Follow project formatting/linting
  - Use conventional commit message format (enforced by commitlint)

- **Before committing**:
  - Run formatters/linters
  - Self-review changes
  - Ensure commit message follows conventional format: `type(scope): description`
  - Commit message types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

### Error Handling

- Fail fast with descriptive messages
- Include context for debugging
- Handle errors at appropriate level
- Never silently swallow exceptions

## Decision Framework

When multiple valid approaches exist, choose based on:

1. **Testability** - Can I easily test this?
2. **Readability** - Will someone understand this in 6 months?
3. **Consistency** - Does this match project patterns?
4. **Simplicity** - Is this the simplest solution that works?
5. **Reversibility** - How hard to change later?

## Project Integration

### Learning the Codebase

- Find 3 similar features/components
- Identify common patterns and conventions
- Use same libraries/utilities when possible
- Follow existing test patterns

### Using the Authentication System

- Import auth utilities from `src/lib/auth.ts` for server-side operations
- Use `authClient` from `src/lib/auth-client.tsx` for client-side auth
- Protect routes using `requireAuth()` middleware
- Get current user with `getCurrentUser()` helper
- Auth API routes are automatically handled by better-auth

### Database Operations

- Use Drizzle ORM with the configured database instance
- Import schemas from `src/db/schema/`
- Run migrations before making schema changes
- Use `pnpm db:studio` for database inspection

### File Storage

- Use R2 storage utilities from `src/lib/storage.ts`
- Files are automatically named with timestamps and random IDs
- Metadata is stored for original filename, upload time, and size
- Generate public URLs for serving files

### Tooling

- Use project's existing build system
- Use project's test framework
- Use project's formatter/linter settings
- Don't introduce new tools without strong justification

## Quality Gates

### Definition of Done

- [ ] Tests written and passing
- [ ] Code follows project conventions
- [ ] No linter/formatter warnings
- [ ] Commit messages are clear
- [ ] Implementation matches plan
- [ ] No TODOs without issue numbers

### Test Guidelines

- Test behavior, not implementation
- One assertion per test when possible
- Clear test names describing scenario
- Use existing test utilities/helpers
- Tests should be deterministic

## Important Reminders

**NEVER**:

- Use `--no-verify` to bypass commit hooks
- Disable tests instead of fixing them
- Commit code that doesn't compile
- Make assumptions - verify with existing code
- Commit `.dev.vars` or any environment files with secrets

**ALWAYS**:

- Commit working code incrementally
- Update plan documentation as you go
- Learn from existing implementations
- Stop after 3 failed attempts and reassess
- Use the configured authentication and database systems

**OTHER**:

- The project uses ES modules (`"type": "module"` in package.json)
- TypeScript paths are configured for `@/*` imports pointing to `src/*`
- The application is production-ready with auth, database, and storage capabilities
- Cloudflare Workers deployment provides global edge performance
- Environment variables are handled differently for dev vs production

## Git Hooks & Quality Assurance

The project uses **Husky** for Git hooks to prevent broken code from being committed:

### Pre-commit Hook (`.husky/pre-commit`)
Automatically runs on every commit attempt:
1. **lint-staged**: Formats and lints only staged files with Biome
2. **TypeScript check**: Fast type checking (`tsc --noEmit`)
3. **Build verification**: Full build to catch module resolution and other errors

### Commit Message Hook (`.husky/commit-msg`)
Enforces conventional commit format using commitlint:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`

### Manual Quality Checks
Run `pnpm validate` to execute all quality checks manually before committing.