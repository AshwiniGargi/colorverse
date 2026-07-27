import type { ComponentProps } from "react";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

type PageSectionProps = ComponentProps<"section"> & {
  containerSize?: "content" | "narrow" | "wide";
};

export function PageSection({
  children,
  className,
  containerSize,
  ...props
}: PageSectionProps) {
  const content = <Container size={containerSize}>{children}</Container>;

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    return <div className={cn("py-10 sm:py-14 lg:py-18", className)}>{content}</div>;
  }

  return (
    <section className={cn("py-10 sm:py-14 lg:py-18", className)} {...props}>
      {content}
    </section>
  );
}
