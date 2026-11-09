'use client';

import { useRef } from 'react';
import Link from 'next/link';
import recipesData from '@/features/search/data/recipes.json';
import { formatRelativeTime } from '@/shared/lib/dateUtils';

// Resep baru diurutkan berdasarkan datePosted
const newRecipes = [...recipesData]
  .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
  .slice(0, 10);

// Resep terpopuler diurutkan berdasarkan jumlah tayangan (views)
const topRecipes = [...recipesData]
  .sort((a, b) => (b.views || 0) - (a.views || 0))
  .slice(0, 10);

function StarRating({ rating = 5, comments = 0 }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-1 text-amber-500">
      <div className="flex text-xs tracking-tighter">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= fullStars ? '★' : '☆'}</span>
        ))}
      </div>
      <span className="text-[11px] font-medium text-stone-500">({comments})</span>
    </div>
  );
}

function RecipeRowCard({ recipe, rank }) {
  const imageUrl = recipe.image?.startsWith('http')
    ? recipe.image
    : `https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=500&h=500&q=80`;

  const isNasiGoreng = recipe.name?.toLowerCase().includes('nasi goreng');
  const targetHref = isNasiGoreng ? '/recipe-detail' : undefined;

  const cardContent = (
    <div className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${targetHref ? 'cursor-pointer' : ''}`}>
      {/* Container Gambar */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={recipe.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge Nomor Peringkat (khusus Top Recipes) */}
        {rank && (
          <div className="absolute left-2.5 top-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-[#200e3f] text-base font-black text-white shadow-md ring-2 ring-white/70 sm:size-10 sm:text-lg">
            {rank}
          </div>
        )}
      </div>

      {/* Konten Card */}
      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <h3 className="line-clamp-2 text-sm font-bold text-stone-900 transition-colors group-hover:text-green-800 sm:text-base leading-snug">
          {recipe.name}
        </h3>

        {/* Rating bintang (tampil jika ada rank / top recipes) */}
        {rank && (
          <div className="mt-1">
            <StarRating rating={recipe.rating} comments={recipe.comments} />
          </div>
        )}

        {/* Lama waktu masak */}
        {recipe.cookingTime && (
          <div className="mt-1.5 flex items-center gap-1 text-[11px] text-stone-600 sm:text-xs">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-3.5 shrink-0 text-stone-400"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>{recipe.cookingTime}</span>
          </div>
        )}

        {/* Penulis resep */}
        <p className="mt-1 text-[11px] text-stone-500 sm:text-xs">
          Oleh <span className="font-semibold text-stone-800">{recipe.author}</span>
        </p>

        {/* Waktu diposting (khusus new recipes) */}
        {!rank && recipe.datePosted && (
          <p suppressHydrationWarning className="mt-1 text-[10px] text-stone-400 sm:text-[11px]">
            {formatRelativeTime(recipe.datePosted)}
          </p>
        )}
      </div>
    </div>
  );

  if (targetHref) {
    return (
      <Link href={targetHref} className="block h-full group focus-visible:outline-2 focus-visible:outline-green-700 rounded-2xl">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

function RecipeSection({ title, recipes, isRanked = false }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -350 : 350;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="mb-12">
      {/* Header Bagian */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-sans text-xl font-bold tracking-tight text-stone-900 sm:text-2xl lg:text-3xl">
          {title}
        </h2>

        {/* Tombol Panah Kiri & Kanan */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Geser resep ke kiri"
            onClick={() => handleScroll('left')}
            className="grid size-8 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-100 active:scale-95 sm:size-9 cursor-pointer"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Geser resep ke kanan"
            onClick={() => handleScroll('right')}
            className="grid size-8 place-items-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-2xs transition hover:bg-stone-100 active:scale-95 sm:size-9 cursor-pointer"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="size-4">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Baris Card (Responsive 6 Kolom di Layar Besar, Scrollable Horizontal di Mobile/Tablet) */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth pb-3 pt-1 sm:gap-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      {/* Hero Section */}
      <section className="mb-12 rounded-2xl bg-green-800 px-6 py-12 text-center text-white sm:px-8 sm:py-14">
        <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">Selamat Datang di Ruang Resep</h1>
        <p className="mb-6 text-green-100">
          Temukan dan bagikan resep masakan favoritmu bersama pengguna lain.
        </p>
        <Link
          href="/search"
          className="rounded-lg bg-white px-6 py-3 font-medium text-green-800 transition-colors hover:bg-green-50"
        >
          Cari Resep
        </Link>
      </section>

      {/* Bagian 1: New Recipes You'll Love */}
      <RecipeSection
        title="Resep Terbaru"
        recipes={newRecipes}
      />

      {/* Bagian 2: This Week's Top Recipes */}
      <RecipeSection
        title="Resep Populer Minggu Ini"
        recipes={topRecipes}
        isRanked={true}
      />
    </div>
  );
}
