# Architecture Decision Log

## ADR-001: Staff-only administration authentication

Date: 2026-07-28

Decision: Use Clerk with Google as the only sign-in method for the V1 Admin
Dashboard. Authorise staff with a server-side email allowlist.

Reason: The dashboard must not be publicly accessible. Clerk provides managed
session security without introducing public user-account functionality.

Alternatives Considered: No authentication (rejected: insecure); custom
credentials authentication (rejected: unnecessary V1 security surface).

Status: Accepted

---

## ADR-002: Pre-generated PDF assets

Date: 2026-07-28

Decision: Upload finished, print-ready PDFs to Cloudinary.

Reason: Editorial PDFs are predictable in quality and avoid a rendering or
generation pipeline in V1.

Alternatives Considered: Generate PDFs on demand (rejected: additional
operational complexity and inconsistent output risk).

Status: Accepted

---

## ADR-003: PostgreSQL full-text search

Date: 2026-07-28

Decision: Implement V1 search using PostgreSQL full-text search, backed by a
generated `tsvector` column and GIN index.

Reason: It satisfies the initial catalogue search need without operating a
separate search service.

Alternatives Considered: Hosted search service (rejected: premature for V1);
simple substring search (rejected: weak relevance and scalability).

Status: Accepted

---

## ADR-004: V1 verification and observability

Date: 2026-07-28

Decision: Start automated testing with Vitest. Defer analytics, Sentry, and
advanced monitoring until after V1 launch.

Reason: Focus initial effort on product delivery and deterministic unit testing.
Google Search Console remains in the launch checklist to validate indexing.

Alternatives Considered: Add the full observability stack in V1 (deferred:
not required to deliver the approved V1 scope).

Status: Accepted
