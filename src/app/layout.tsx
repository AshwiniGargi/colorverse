import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PublicShell } from "@/components/layout/public-shell";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { AppProviders } from "@/providers/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...createMetadata({ description: siteConfig.description }),
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AppProviders>
          <PublicShell>{children}</PublicShell>
        </AppProviders>
      </body>
    </html>
  );
}
