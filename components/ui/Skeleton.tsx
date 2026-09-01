import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "heading" | "avatar" | "image" | "button" | "card";

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const roundedStyles: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded",
  lg: "rounded-lg",
  full: "rounded-full",
};

const variantDefaults: Record<SkeletonVariant, { width: string; height: string; rounded: string }> = {
  text: { width: "w-full", height: "h-4", rounded: "rounded" },
  heading: { width: "w-3/4", height: "h-8", rounded: "rounded" },
  avatar: { width: "w-12", height: "h-12", rounded: "rounded-full" },
  image: { width: "w-full", height: "h-48", rounded: "rounded-lg" },
  button: { width: "w-32", height: "h-10", rounded: "rounded-full" },
  card: { width: "w-full", height: "h-64", rounded: "rounded-lg" },
};

export function Skeleton({
  variant = "text",
  className,
  width,
  height,
  rounded,
}: SkeletonProps) {
  const defaults = variantDefaults[variant];
  const r = rounded ?? defaults.rounded;

  return (
    <div
      className={cn(
        "bg-surface-container-high animate-pulse",
        roundedStyles[r],
        !width && defaults.width,
        !height && defaults.height,
        className
      )}
      style={{
        width: width ? (typeof width === "number" ? `${width}px` : width) : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
      }}
      aria-hidden="true"
    />
  );
}

/* Pre-built composite skeletons */

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton variant="image" className="aspect-[3/4]" />
      <Skeleton variant="text" className="w-2/3 h-3" />
      <Skeleton variant="text" className="w-1/2 h-4" />
      <Skeleton variant="text" className="w-1/3 h-3" />
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 py-6 border-b border-outline-variant/10">
      <Skeleton variant="image" width={80} height={96} rounded="md" />
      <div className="flex-1 flex flex-col gap-2">
        <Skeleton variant="text" className="w-1/3 h-4" />
        <Skeleton variant="text" className="w-1/4 h-3" />
        <Skeleton variant="text" className="w-1/4 h-3" />
      </div>
      <Skeleton variant="button" width={80} height={32} />
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="flex flex-col gap-4 p-6 border border-outline-variant/30 rounded-lg">
      <Skeleton variant="heading" className="w-1/2 h-6" />
      <Skeleton variant="text" className="h-3" />
      <Skeleton variant="text" className="h-3" />
      <Skeleton variant="text" className="w-2/3 h-3" />
      <div className="h-px bg-outline-variant/30 my-2" />
      <Skeleton variant="heading" className="w-1/3 h-6" />
      <Skeleton variant="button" className="w-full h-12 mt-4" />
    </div>
  );
}

export function GallerySkeleton() {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width={64} height={80} rounded="md" />
        ))}
      </div>
      <Skeleton variant="image" className="flex-1 aspect-[3/4]" rounded="lg" />
    </div>
  );
}
