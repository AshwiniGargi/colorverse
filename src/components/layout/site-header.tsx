import Link from "next/link";
import { Container } from "@/components/layout/container";
import { primaryNavigation } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background/95">
      <Container size="wide">
        <div className="flex min-h-16 items-center justify-between gap-4 sm:min-h-18">
          <Link
            className="rounded-md text-lg font-semibold tracking-tight text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            href="/"
          >
            ColorVerse
          </Link>
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {primaryNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
