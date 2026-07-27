# ColorVerse

ColorVerse is an SEO-first educational platform for printable colouring pages.
Version 1 provides public page discovery, printable PDF downloads, print
support, search, and a staff-only content administration workflow.

## Stack

- Next.js App Router, React, TypeScript, and Tailwind CSS
- shadcn/ui for accessible UI primitives
- PostgreSQL and Prisma
- Clerk with Google-only staff sign-in
- Cloudinary for image and pre-generated PDF assets
- Vitest, ESLint, Prettier, Husky, and lint-staged

## Prerequisites

- Node.js 20.19 or newer
- pnpm 10 or newer
- A PostgreSQL database
- Clerk and Cloudinary projects

## Local setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create your local environment file and replace every example value:

   ```bash
   cp .env.example .env.local
   ```

3. In the Clerk Dashboard, enable Google as the only sign-in provider. Add all
   permitted staff email addresses to `ADMIN_EMAIL_ALLOWLIST` as a
   comma-separated, lower-case list.

4. Validate the Prisma schema and generate the client:

   ```bash
   pnpm prisma:validate
   pnpm prisma:generate
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

Open `http://localhost:3000`.

## Commands

| Command                | Purpose                           |
| ---------------------- | --------------------------------- |
| `pnpm dev`             | Run the local Next.js server.     |
| `pnpm build`           | Create a production build.        |
| `pnpm lint`            | Run ESLint.                       |
| `pnpm format:check`    | Check formatting with Prettier.   |
| `pnpm format`          | Format supported files.           |
| `pnpm test`            | Run Vitest once.                  |
| `pnpm test:watch`      | Run Vitest in watch mode.         |
| `pnpm prisma:validate` | Validate the Prisma schema.       |
| `pnpm prisma:generate` | Generate the local Prisma client. |

## Data and migrations

`DATABASE_URL` is the pooled runtime PostgreSQL connection. `DIRECT_URL` is the
direct connection used by Prisma migration commands. Do not run production
migrations automatically as part of a Vercel build; follow the controlled
release process in `docs/DEPLOYMENT.md`.

The initial migration must add the PostgreSQL full-text-search generated column
and GIN index specified in `docs/DATABASE.md`.

## Documentation

- `docs/PROJECT_SPEC.md` — V1 scope and success criteria
- `docs/ARCHITECTURE.md` — architectural boundaries and approved structure
- `docs/DATABASE.md` — data model and full-text-search design
- `docs/UI_GUIDELINES.md` — responsive and accessibility standards
- `docs/DEPLOYMENT.md` — deployment architecture and environment separation
- `docs/DECISIONS.md` — architecture decision record
