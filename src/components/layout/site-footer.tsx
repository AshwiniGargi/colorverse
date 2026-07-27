import Link from "next/link";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container size="wide">
        <div className="flex min-h-20 flex-col justify-center gap-2 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} ColorVerse. Printable learning made simple.</p>
          <Link
            className="w-fit rounded-md font-medium text-foreground outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            href="/"
          >
            ColorVerse
          </Link>
        </div>
      </Container>
    </footer>
  );
}
