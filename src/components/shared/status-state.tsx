import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type StatusStateProps = Readonly<{
  action?: ReactNode;
  className?: string;
  description: string;
  icon: LucideIcon;
  title: string;
}>;

function StatusState({
  action,
  className,
  description,
  icon: Icon,
  title,
}: StatusStateProps) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16",
        className,
      )}
    >
      <Icon aria-hidden="true" className="mb-4 size-8 text-muted-foreground" />
      <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

type StateCopy = Pick<StatusStateProps, "description" | "title">;

export function EmptyState({
  className,
  description,
  title,
}: StateCopy & { className?: string }) {
  return <StatusState className={className} description={description} icon={Inbox} title={title} />;
}

export function ErrorState({
  action,
  className,
  description,
  title,
}: StateCopy & { action?: ReactNode; className?: string }) {
  return (
    <StatusState
      action={action}
      className={className}
      description={description}
      icon={AlertCircle}
      title={title}
    />
  );
}

export function LoadingState({ description = "Loading content…" }: { description?: string }) {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <LoaderCircle aria-hidden="true" className="size-6 animate-spin motion-reduce:animate-none" />
        <span>{description}</span>
      </div>
    </div>
  );
}
