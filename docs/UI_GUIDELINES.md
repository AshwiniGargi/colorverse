# ColorVerse V1 UI Guidelines

## Product Character

The interface should feel cheerful, calm, inclusive, and trustworthy to
parents and teachers while remaining simple enough for young children to use
with assistance. It must never feel cluttered, overly animated, or dependent
on a child reading dense instructions.

## Responsive Design

- Design mobile-first; enhance rather than hide essential functionality on
  larger screens.
- Support widths from 320px upward without horizontal scrolling.
- Use a single-column content flow on small screens and introduce grid layouts
  only when cards remain comfortably readable.
- Keep primary actions reachable and visually prominent on touch devices.

## Layout and Components

- Use a consistent centered content container with a documented maximum width.
- Every public page includes the shared header/navigation and footer.
- Colouring-page cards consistently show the image, title, category, and link.
- Individual page layouts give the printable image, Download PDF, and Print
  actions clear priority above related content.
- Use shadcn/ui primitives as the accessible baseline; compose rather than
  fork them unless a component has a demonstrated product need.

## Typography and Colour

- Choose a friendly, highly legible typeface pair and document the final choice
  in the design tokens before implementation.
- Use a limited semantic colour system: brand, accent, surface, text, muted,
  success, and destructive. Do not communicate meaning with colour alone.
- Maintain WCAG 2.2 AA contrast: 4.5:1 for normal text and 3:1 for large text
  and graphical controls.
- Do not finalise a brand palette, logo treatment, or illustration system until
  brand assets or explicit approval are available.

## Accessibility

- Use semantic landmarks, a visible keyboard focus state, logical heading
  order, and a skip-to-content link.
- Provide descriptive alternatives for meaningful images. The colouring-page
  `imageAlt` field is mandatory.
- Controls have visible text or accessible names; icon-only controls require
  an `aria-label`.
- Do not rely on hover, colour, drag, or fine pointer precision as the only way
  to access functionality.
- Respect `prefers-reduced-motion`; avoid nonessential motion by default.
- Form errors are associated with their fields and announced accessibly.

## Interaction and States

- All asynchronous actions expose pending, success, and recoverable error
  states.
- Empty search results state what was searched and offer a clear route back to
  categories.
- Public 404 pages help visitors return to the catalogue without exposing
  internal system detail.
- Do not use generic placeholder imagery or lorem ipsum in production views.

## Print and PDF Experience

- Print styles hide navigation, footer, search, and unrelated page content.
- The printable artwork occupies the available printable area without clipping;
  test browser print preview before release.
- “Download PDF” downloads the uploaded, print-ready asset with a
  human-readable filename.
- Link text and buttons distinguish printing the page from downloading its PDF.

## SEO and Performance UI Rules

- Use descriptive, unique headings and link labels; never use “click here.”
- Reserve image dimensions to prevent layout shift.
- Deliver Cloudinary images with intentional responsive sizing and modern
  formats where browser-compatible, while preserving the line-art appearance.
- Prefer server-rendered content. Use client components only for interaction
  that genuinely needs the browser.
