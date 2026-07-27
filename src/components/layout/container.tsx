import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const containerWidths = {
  content: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
} as const;

type ContainerProps = ComponentProps<"div"> & {
  size?: keyof typeof containerWidths;
};

export function Container({
  children,
  className,
  size = "content",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerWidths[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
