import { env } from "@/lib/env";

export const siteConfig = {
  description: "Printable colouring pages for children, parents, and teachers.",
  locale: "en_US",
  name: "ColorVerse",
  url: env.NEXT_PUBLIC_SITE_URL,
} as const;
