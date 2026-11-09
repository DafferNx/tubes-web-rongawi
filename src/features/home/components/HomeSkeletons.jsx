export function ResepTerbaruSkeleton() {
  return (
    <div aria-hidden="true" className="mb-14">
      <div className="mb-6 space-y-2">
        <div className="h-8 w-48 rounded-lg bg-stone-200 animate-pulse" />
        <div className="h-4 w-72 rounded-lg bg-stone-100 animate-pulse" />
      </div>
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 rounded-2xl border border-stone-200 bg-white p-3 space-y-4 animate-pulse">
          <div className="aspect-[16/10] w-full rounded-xl bg-stone-200" />
          <div className="space-y-2 p-2">
            <div className="h-6 w-3/4 rounded bg-stone-200" />
            <div className="h-4 w-1/3 rounded bg-stone-100" />
            <div className="h-4 w-1/2 rounded bg-stone-100 pt-2" />
          </div>
        </div>
        <div className="lg:col-span-6 flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white p-3 animate-pulse">
              <div className="size-24 rounded-xl bg-stone-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 w-3/4 rounded bg-stone-200" />
                <div className="h-3.5 w-1/3 rounded bg-stone-100" />
                <div className="h-3.5 w-1/2 rounded bg-stone-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecipeSectionSkeleton({ title }) {
  return (
    <div aria-hidden="true" className="mb-12">
      <div className="mb-4 h-8 w-56 rounded-lg bg-stone-200 animate-pulse" />
      <div className="flex gap-3 sm:gap-4 overflow-hidden pb-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="w-[160px] sm:w-[185px] lg:w-[calc((100%-5*1rem)/6)] shrink-0 rounded-2xl border border-stone-200 bg-white p-3 space-y-3 animate-pulse">
            <div className="aspect-square w-full rounded-xl bg-stone-200" />
            <div className="h-4 w-3/4 rounded bg-stone-200" />
            <div className="h-3 w-1/2 rounded bg-stone-100" />
            <div className="h-3 w-2/3 rounded bg-stone-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

