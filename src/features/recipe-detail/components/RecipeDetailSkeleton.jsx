import { Skeleton } from '@/shared/ui/SearchPrimitives';

export function RecipeDetailSkeleton() {
  return (
    <div role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">Memuat resep…</span>
      <Skeleton className="h-4 w-56" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-10 w-48" />
        </div>
        <Skeleton className="aspect-[3/2] w-full rounded-3xl" />
      </div>
      <Skeleton className="mt-8 h-20 w-full" />
      <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr]">
        <Skeleton className="h-80" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    </div>
  );
}
