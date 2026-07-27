import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataInput = Readonly<{
  description: string;
  path?: string;
  title?: string;
}>;

export function createMetadata({
  description,
  path = "/",
  title,
}: PageMetadataInput): Metadata {
  const canonicalUrl = new URL(path, siteConfig.url).toString();
  const resolvedTitle = title ?? siteConfig.name;

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    openGraph: {
      description,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: resolvedTitle,
      type: "website",
      url: canonicalUrl,
    },
    title,
    twitter: {
      card: "summary",
      description,
      title: resolvedTitle,
    },
  };
}
