import { Skeleton } from "@/components/ui/skeleton";

export function PageLoadingSkeleton({
  heroHeight = "500px",
}: {
  heroHeight?: string;
}) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <Skeleton className={`w-full rounded-3xl mb-12`} style={{ height: heroHeight }} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="lg:col-span-4">
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
