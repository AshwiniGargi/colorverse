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

src/

app/

components/

features/

hooks/

lib/

services/

types/

utils/

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

---

# Performance Goals

- Lighthouse >95
- Image optimisation
- Server-side rendering
- Static generation where possible