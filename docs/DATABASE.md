# ColorVerse V1 Database Design

## Purpose and Boundaries

PostgreSQL stores the public catalogue and its editorial state. Clerk is the
source of truth for staff identities and sessions; no Clerk user records are
mirrored in the V1 database. Cloudinary is the source of truth for binary image
and PDF assets, while PostgreSQL stores their Cloudinary public identifiers.

V1 intentionally has no public users, favourites, payments, orders, comments,
tags, or audit-log tables.

## Entities

### Category

A public grouping for colouring pages. Its `slug` is the stable route segment.
A category cannot be deleted while pages reference it; use an archived state
instead if it must be removed from navigation.

### ColoringPage

A single printable colouring-page detail page. Every page has exactly one
category in V1. A page may be drafted, published, or archived. Only published
pages are eligible for public routes, metadata, sitemap entries, search, and
related-page queries.

## Prisma Schema Specification

`prisma/schema.prisma` contains this approved application schema. The initial
database migration must also create the full-text search column and index
described below.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "postgresql"
}

enum PublicationStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model Category {
  id            String            @id @default(cuid())
  name          String            @db.VarChar(80)
  slug          String            @unique @db.VarChar(100)
  description   String?           @db.VarChar(300)
  imagePublicId String?           @db.VarChar(255)
  imageAlt      String?           @db.VarChar(160)
  status        PublicationStatus @default(DRAFT)
  sortOrder     Int               @default(0)
  pages         ColoringPage[]
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt

  @@index([status, sortOrder])
}

model ColoringPage {
  id                String            @id @default(cuid())
  title             String            @db.VarChar(120)
  slug              String            @unique @db.VarChar(140)
  description       String            @db.VarChar(500)
  imagePublicId     String            @unique @db.VarChar(255)
  imageAlt          String            @db.VarChar(160)
  pdfPublicId       String            @unique @db.VarChar(255)
  status            PublicationStatus @default(DRAFT)
  publishedAt       DateTime?
  seoTitle          String?           @db.VarChar(60)
  seoDescription    String?           @db.VarChar(160)
  categoryId        String
  category          Category          @relation(fields: [categoryId], references: [id], onDelete: Restrict, onUpdate: Cascade)
  createdAt         DateTime          @default(now())
  updatedAt         DateTime          @updatedAt

  @@index([categoryId, status, publishedAt])
  @@index([status, publishedAt])
}
```

Prisma 7 reads the direct migration connection from `prisma.config.ts`.
Application runtime connections use `DATABASE_URL` through the Prisma PostgreSQL
driver adapter; migrations use `DIRECT_URL`.

## Search Design

Prisma does not express a generated `tsvector` column and its GIN index in this
schema. The initial Prisma migration must add both with SQL:

```sql
ALTER TABLE "ColoringPage"
ADD COLUMN "searchVector" tsvector GENERATED ALWAYS AS (
  to_tsvector(
    'english',
    coalesce("title", '') || ' ' || coalesce("description", '')
  )
) STORED;

CREATE INDEX "ColoringPage_searchVector_idx"
ON "ColoringPage" USING GIN ("searchVector");
```

Search queries must filter to `status = 'PUBLISHED'`, rank with
`ts_rank`, and use `websearch_to_tsquery('english', query)`. The query is a
parameterised raw Prisma query because Prisma's standard model API cannot query
this generated column. Page size and result ordering are application concerns
to define before implementation.

## Data Integrity Rules

- `slug`, `imagePublicId`, and `pdfPublicId` are globally unique.
- `publishedAt` is required when a page enters `PUBLISHED` status and is null
  otherwise; enforce this in the server-side validation layer.
- `imageAlt` is required for every colouring page.
- A published page requires its required title, description, image, PDF, and
  category.
- `seoTitle` and `seoDescription` fall back to `title` and `description` when
  omitted.
- Raw Cloudinary URLs are not stored; delivery URLs are derived from public IDs
  and the approved transformation policy.
