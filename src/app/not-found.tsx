import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ErrorState } from "@/components/shared/status-state";

export default function NotFound() {
  return (
    <ErrorState
      action={
        <Button render={<Link href="/" />} size="lg">
          Return home
        </Button>
      }
      description="The page you requested is not available."
      title="Page not found"
    />
  );
}
