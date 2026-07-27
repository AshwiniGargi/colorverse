# ColorVerse Architecture

## Tech Stack

### Frontend

- Next.js (latest stable)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js Route Handlers
- Server Actions

### Administration Authentication

- Clerk
- Google sign-in only
- Staff access is authorised by an allowlist of email addresses

### Database

- PostgreSQL

### ORM

- Prisma

### Storage

- Cloudinary

### Hosting

- Vercel

---

# Development Principles

- SEO-first
- Mobile-first
- Accessibility
- Performance
- Scalability
- Clean Architecture

---

# Folder Structure

The detailed proposed structure is maintained separately for approval before
Sprint 0. Routes live in `src/app`; feature ownership lives in `src/features`.

## Data and Assets

- PostgreSQL full-text search is the only V1 search engine.
- Prisma owns application data access and migrations.
- Cloudinary stores original colouring-page images and pre-generated,
  print-ready PDF assets. V1 does not generate PDFs at request time.
- `docs/DATABASE.md` is the authoritative data-model specification.

## Routing

- Category detail pages use `/categories/[slug]`.
- Individual colouring-page detail pages use `/coloring/[slug]`.
- `/coloring-pages/[slug]` is not used in V1.

## Project Boundaries

- `src/config` holds typed application configuration derived from validated
  environment variables.
- `src/constants` holds static, environment-independent values.
- `src/providers` contains app-wide React providers only.
- Feature data access may be colocated with the owning feature. Do not add a
  separate `queries` layer unless repeated needs demonstrate its value.
- Avoid generic top-level `services`, `types`, `hooks`, and `utils` folders.

## Approved Project Structure

```text
prisma/                 # Prisma schema and migrations
src/app/                # App Router routes, layouts, metadata routes
src/components/         # Shared layout, shared components, shadcn/ui
src/config/             # Typed application configuration
src/constants/          # Static cross-cutting constants
src/features/           # Feature-owned components, validation, actions, types
src/lib/                # Infrastructure clients and cross-cutting helpers
src/providers/          # Application-wide React providers
src/generated/prisma/   # Generated locally; ignored by Git
src/test/               # Shared Vitest setup
tests/unit/             # Unit tests
```

`src/app` will contain `(public)`, `(admin)`, and metadata routes as features
are implemented. Public page routes are `/categories/[slug]` and
`/coloring/[slug]`. Empty feature and route directories are not committed; they
are introduced with their first purposeful file.

---

# Architecture Style

Feature-based architecture.

Each feature owns:

- Components
- Types
- Validation
- Server Actions
- Utilities

---

# Coding Standards

- TypeScript Strict Mode
- Functional Components
- Server Components by default
- Zod validation
- ESLint
- Prettier
- Husky
- Vitest for initial automated tests

## Deferred Operational Tooling

Analytics, Sentry, and advanced monitoring are explicitly deferred until after
the V1 launch. Google Search Console remains a launch activity because it is
required to assess indexing.

---

# Performance Goals

- Lighthouse >95
- Image optimisation
- Server-side rendering
- Static generation where possible
