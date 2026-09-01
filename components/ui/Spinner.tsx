import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "text-[16px]",
  md: "text-[24px]",
  lg: "text-[40px]",
};

export function Spinner({ size = "md", label, className }: SpinnerProps) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-3", className)}
      role="status"
      aria-label={label ?? "Loading"}
    >
      <span
        className={cn(
          "material-symbols-outlined animate-spin text-primary",
          sizeStyles[size]
        )}
      >
        progress_activity
      </span>
      {label && (
        <p className="font-body-md text-on-surface-variant animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

/* Full-page loading overlay */
export function PageSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface/80 backdrop-blur-sm">
      <Spinner size="lg" label={label} />
    </div>
  );
}

/* Inline section spinner */
export function SectionSpinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-24">
      <Spinner size="md" label={label} />
    </div>
  );
}
