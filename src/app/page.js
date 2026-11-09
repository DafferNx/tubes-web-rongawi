'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import recipesData from '@/features/search/data/recipes.json';
import { formatRelativeTime } from '@/shared/lib/dateUtils';

// Daftar gambar latar belakang hero section yang berganti otomatis
const heroImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1920&q=80',
];

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

        {/* Rating bintang (tampil di semua card) */}
        <div className="mt-1">
          <StarRating rating={recipe.rating} comments={recipe.comments} />
        </div>

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

        {/* Waktu diposting (tampil di semua card) */}
        {recipe.datePosted && (
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Efek ganti gambar otomatis setiap 4.5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section Banner (Full Width: Latar Berganti Otomatis dengan Transisi Halus) */}
      <section className="relative h-[380px] w-full overflow-hidden bg-stone-950 sm:h-[440px] lg:h-[480px]">
        {/* Koleksi Gambar Background dengan Transisi Crossfade */}
        {heroImages.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt="Inspirasi Masakan Ruang Resep"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${index === activeImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
          />
        ))}

        {/* Lapisan Vignette Gelap di Sisi Kiri (Memastikan teks selalu kontras dan tajam) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:via-black/50" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

        {/* Konten Hero di Sisi Kiri */}
        <div className="relative z-20 mx-auto flex h-full max-w-6xl items-center px-6 sm:px-8 lg:px-8">
          <div className="max-w-xl text-left">
            <h1 className="font-sans text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.12]">
              Temukan lebih dari ribuan resep yang tersedia
            </h1>

            <div className="mt-6">
              <Link
                href="/search"
                className="inline-block rounded-md bg-green-700 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-green-600 hover:shadow-lg active:scale-95 sm:text-sm"
              >
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>

        {/* Indikator Slider Gambar di Pojok Kanan Bawah */}
        <div className="absolute bottom-5 right-6 z-20 flex items-center gap-1.5 sm:right-8 lg:right-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Lihat gambar latar ${i + 1}`}
              onClick={() => setActiveImageIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeImageIndex ? 'w-6 bg-green-500' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
            />
          ))}
        </div>
      </section>

      {/* Bagian Konten Bawah (Tetap di dalam Container Max 6XL) */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
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
    </div>
  );
}
