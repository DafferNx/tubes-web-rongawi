'use client';

import { useRef } from 'react';
import RecipeRowCard from './RecipeRowCard';

export default function RecipeSection({ title, recipes, isRanked = false }) {
  const scrollRef = useRef(null);
  const headingId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -350 : 350;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby={headingId} className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={headingId} className="font-sans text-xl font-bold tracking-tight text-stone-900 sm:text-2xl lg:text-3xl">
          {title}
        </h2>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Geser daftar resep ke kiri"
            onClick={() => handleScroll('left')}
            className="grid size-8 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-100 active:scale-95 sm:size-9 cursor-pointer focus-visible:outline-2 focus-visible:outline-green-700"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Geser daftar resep ke kanan"
            onClick={() => handleScroll('right')}
            className="grid size-8 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-100 active:scale-95 sm:size-9 cursor-pointer focus-visible:outline-2 focus-visible:outline-green-700"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        tabIndex={0}
        role="region"
        aria-label={`Daftar ${title}, gunakan tombol panah keyboard atau kontrol geser untuk melihat resep`}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-3 pt-1 sm:gap-4 focus-visible:outline-2 focus-visible:outline-green-700 rounded-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {recipes.map((recipe, index) => (
          <div
            key={recipe.id}
            className="w-[160px] shrink-0 sm:w-[185px] lg:w-[calc((100%-5*1rem)/6)]"
          >
            <RecipeRowCard
              recipe={recipe}
              rank={isRanked ? index + 1 : null}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

