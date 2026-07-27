"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/status-state";
import "./globals.css";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-foreground">
        <ErrorState
          action={<Button onClick={reset}>Try again</Button>}
          description="Something unexpected happened. Please try again."
          title="Unable to load ColorVerse"
        />
      </body>
    </html>
  );
}
