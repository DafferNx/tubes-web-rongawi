'use client';

import HeroSection from './HeroSection';
import ResepTerbaruSection from './ResepTerbaruSection';
import RecipeSection from './RecipeSection';
import { ResepTerbaruSkeleton, RecipeSectionSkeleton } from './HomeSkeletons';
import { useHomeRecipes } from '../hooks/useHomeRecipes';

export default function HomeView() {
  const { newRecipes, topRecipes, isLoading, errorMessage, refetch } = useHomeRecipes();

  return (
    <div className="w-full">
      <HeroSection />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {errorMessage && (
          <div role="alert" className="mb-10 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-red-600 shrink-0 mt-0.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <div>
                  <h3 className="font-bold text-red-950">Gagal Memuat Data Resep</h3>
                  <p className="mt-0.5 text-xs sm:text-sm text-red-800">{errorMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={refetch}
                className="self-start sm:self-auto rounded-xl bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-red-700 active:scale-95 cursor-pointer shrink-0"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <>
            <ResepTerbaruSkeleton />
            <RecipeSectionSkeleton title="Resep Populer Minggu Ini" />
          </>
        ) : (
          <>
            {newRecipes.length > 0 && <ResepTerbaruSection recipes={newRecipes} />}
            {topRecipes.length > 0 && (
              <RecipeSection
                title="Resep Populer Minggu Ini"
                recipes={topRecipes}
                isRanked={true}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

