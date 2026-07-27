# ColorVerse V1 Deployment Architecture

## Overview

ColorVerse deploys as a Next.js application on Vercel. Vercel runs the public
site and the server-side code used by the staff-only Admin Dashboard. Managed
services hold application data, binary assets, and identity. GitHub is the
source-control and deployment trigger.

```text
GitHub repository
        │ push / pull request
        ▼
Vercel ────────────────► Next.js application
        │                         │
        │                         ├──► PostgreSQL via Prisma
        │                         ├──► Cloudinary image and PDF assets
        │                         └──► Clerk staff authentication
        │
        └── preview and production deployments
```

## Responsibilities

| System     | Responsibility                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub     | Source control, pull requests, and the trigger for Vercel deployments.                                                                      |
| Vercel     | Hosts Next.js, serves static and server-rendered pages, runs server actions and route handlers, and manages preview/production deployments. |
| PostgreSQL | Stores categories, colouring-page metadata, publication state, and full-text search indexes.                                                |
| Cloudinary | Stores original colouring-page images and pre-generated PDF assets; delivers transformed public images.                                     |
| Clerk      | Manages Google-only staff sign-in and sessions for `/admin`; no public accounts are enabled.                                                |

## Environments

- **Local:** developer machine with local or development managed PostgreSQL and
  non-production Clerk/Cloudinary credentials.
- **Preview:** Vercel deployment for each pull request. It must use isolated or
  safely shared non-production data and credentials; it must never write to
  production content or assets.
- **Production:** Vercel production deployment connected to production
  PostgreSQL, Cloudinary, and Clerk instances.

## Configuration and Secrets

- `.env.example` documents every required variable but contains no secrets.
- Local secrets live only in `.env.local`, which is ignored by Git.
- Vercel holds preview and production secrets in its encrypted environment
  configuration.
- `CLERK_SECRET_KEY`, `CLOUDINARY_API_SECRET`, `DATABASE_URL`, and `DIRECT_URL`
  are server-only. Variables prefixed with `NEXT_PUBLIC_` are intentionally
  exposed to the browser.
- Middleware requires an authenticated Clerk session for `/admin`. Every future
  admin page, server action, and route handler must also call
  `requireAdminUser` to enforce the email allowlist.

## Deployment Flow

1. A change is reviewed and merged through GitHub.
2. Vercel builds the commit using the lockfile and runs the configured build
   command.
3. Prisma migrations are applied as an explicit controlled release step against
   the target database; application builds must not run production migrations
   automatically.
4. Vercel promotes the validated production deployment.

## Operational Boundaries

- Database backups, restore testing, and retention are selected from the
  managed PostgreSQL provider before production data is created.
- Cloudinary asset deletion follows the editorial lifecycle; database records
  must not reference deleted public IDs.
- Analytics, Sentry, and advanced monitoring are post-V1 work. Vercel build
  logs and deployment health are the V1 operational baseline.
