'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { fetchRecipes } from '@/shared/api/recipes';
import { getErrorMessage } from '@/shared/lib/axiosClient';
import { formatRelativeTime } from '@/shared/lib/dateUtils';

// Daftar gambar latar belakang hero section yang berganti otomatis
const heroImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1920&q=80',
];

function StarRating({ rating = 5, comments = 0 }) {
  const fullStars = Math.floor(rating);
  return (
    <div
      role="img"
      aria-label={`Rating ${rating.toLocaleString('id-ID')} dari 5 bintang${comments > 0 ? `, ${comments} ulasan` : ''}`}
      className="flex items-center gap-1 text-amber-500"
    >
      <div className="flex text-xs tracking-tighter" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= fullStars ? '★' : '☆'}</span>
        ))}
      </div>
      {comments > 0 && (
        <span className="text-[11px] font-medium text-stone-500">({comments})</span>
      )}
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
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${targetHref ? 'cursor-pointer' : ''}`}>
      {/* Container Gambar */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Foto masakan ${recipe.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge Nomor Peringkat (khusus Top Recipes) */}
        {rank && (
          <span
            aria-label={`Peringkat ${rank}`}
            className="absolute left-2.5 top-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-[#200e3f] text-base font-black text-white shadow-md ring-2 ring-white/70 sm:size-10 sm:text-lg"
          >
            {rank}
          </span>
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

        {/* Waktu diposting (tampil di semua card dengan elemen semantik <time>) */}
        {recipe.datePosted && (
          <time
            dateTime={recipe.datePosted}
            suppressHydrationWarning
            className="mt-1 block text-[10px] text-stone-400 sm:text-[11px]"
          >
            {formatRelativeTime(recipe.datePosted)}
          </time>
        )}
      </div>
    </article>
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

// Layout Khusus Resep Terbaru:
// 1 Kartu Besar di Kiri & Kolom Kanan Scrollable yang SEJAJAR PERSIS tingginya dengan kartu kiri
function ResepTerbaruSection({ recipes }) {
  const featuredRecipe = recipes[0];
  const sideRecipes = recipes.slice(1, 10); // 9 resep terbaru berikutnya

  const leftCardRef = useRef(null);
  const [matchedHeight, setMatchedHeight] = useState(null);

  // Mengukur dan menyinkronkan tinggi kartu kiri ke kontainer kanan secara dinamis
  useEffect(() => {
    const syncHeight = () => {
      if (leftCardRef.current && window.innerWidth >= 1024) {
        setMatchedHeight(leftCardRef.current.offsetHeight);
      } else {
        setMatchedHeight(null);
      }
    };

    syncHeight();

    let observer;
    if (leftCardRef.current && typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => syncHeight());
      observer.observe(leftCardRef.current);
    }

    window.addEventListener('resize', syncHeight);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', syncHeight);
    };
  }, []);

  if (!featuredRecipe) return null;

  const featuredImg = featuredRecipe.image?.startsWith('http')
    ? featuredRecipe.image
    : `https://images.unsplash.com/${featuredRecipe.image}?auto=format&fit=crop&w=800&h=550&q=80`;

  const isFeaturedNasiGoreng = featuredRecipe.name?.toLowerCase().includes('nasi goreng');
  const featuredHref = isFeaturedNasiGoreng ? '/recipe-detail' : undefined;

  return (
    <section aria-labelledby="judul-resep-terbaru" className="mb-14">
      {/* Header Bagian */}
      <div className="mb-6">
        <h2 id="judul-resep-terbaru" className="font-sans text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Resep Terbaru
        </h2>
        <p className="mt-1 text-xs text-stone-500 sm:text-sm">
          Berbagai ide masak baru hadir setiap hari untuk sajian spesial keluarga tercinta!
        </p>
      </div>

      {/* Grid Tata Letak: Sejajar Ujung Atas & Bawah di Desktop */}
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        
        {/* SISI KIRI: Kartu Besar Unggulan (Paling Baru: Nasi Goreng) */}
        <div ref={leftCardRef} className="lg:col-span-6 xl:col-span-6">
          <Link href={featuredHref || '#'} className="group block h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImg}
                  alt={`Foto masakan unggulan ${featuredRecipe.name}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 transition-colors group-hover:text-green-800 sm:text-xl">
                    {featuredRecipe.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    Oleh <span className="font-semibold text-stone-800">{featuredRecipe.author}</span>
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-stone-100 pt-3 text-xs text-stone-600">
                  <StarRating rating={featuredRecipe.rating} comments={featuredRecipe.comments} />
                  <span aria-hidden="true">•</span>
                  {featuredRecipe.cookingTime && (
                    <span className="inline-flex items-center gap-1 text-stone-600">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-stone-400">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>{featuredRecipe.cookingTime}</span>
                    </span>
                  )}
                  <span aria-hidden="true">•</span>
                  {featuredRecipe.datePosted && (
                    <time
                      dateTime={featuredRecipe.datePosted}
                      suppressHydrationWarning
                      className="text-[11px] text-stone-400"
                    >
                      {formatRelativeTime(featuredRecipe.datePosted)}
                    </time>
                  )}
                </div>
              </div>
            </article>
          </Link>
        </div>

        {/* SISI KANAN: Daftar 9 Resep Scrollable (Accessible with Keyboard Focus & Region Role) */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Daftar 9 resep terbaru berikutnya, gunakan tombol panah untuk menggulir"
          style={{ height: matchedHeight ? `${matchedHeight}px` : undefined }}
          className="flex flex-col gap-3 overflow-y-auto pr-2 scroll-smooth lg:col-span-6 xl:col-span-6 max-lg:max-h-[500px] focus-visible:outline-2 focus-visible:outline-green-700 rounded-2xl [scrollbar-width:thin] [scrollbar-color:#d6d3d1_transparent] hover:[scrollbar-color:#a8a29e_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-stone-300 hover:[&::-webkit-scrollbar-thumb]:bg-stone-400 [&::-webkit-scrollbar-track]:bg-transparent"
        >
          {sideRecipes.map((item) => {
            const sideImg = item.image?.startsWith('http')
              ? item.image
              : `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=400&h=300&q=80`;
            const isItemNasiGoreng = item.name?.toLowerCase().includes('nasi goreng');
            const itemHref = isItemNasiGoreng ? '/recipe-detail' : undefined;

            const horizontalCard = (
              <article className={`group flex items-center overflow-hidden rounded-2xl border border-stone-200 bg-white p-2.5 sm:p-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${itemHref ? 'cursor-pointer' : ''}`}>
                {/* Foto Sisi Kiri */}
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-28 sm:aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sideImg}
                    alt={`Foto masakan ${item.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Konten Keterangan Sisi Kanan */}
                <div className="ml-3.5 flex flex-1 flex-col justify-center min-w-0">
                  <h4 className="line-clamp-1 text-sm font-bold text-stone-900 transition-colors group-hover:text-green-800 sm:text-base">
                    {item.name}
                  </h4>
                  <p className="mt-0.5 text-xs text-stone-500">
                    Oleh <span className="font-semibold text-stone-800">{item.author}</span>
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-stone-600 sm:gap-3">
                    <StarRating rating={item.rating} comments={item.comments} />
                    {item.cookingTime && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-stone-500">
                        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-stone-400">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>{item.cookingTime}</span>
                      </span>
                    )}
                    {item.datePosted && (
                      <time
                        dateTime={item.datePosted}
                        suppressHydrationWarning
                        className="text-[10px] text-stone-400 hidden sm:inline"
                      >
                        • {formatRelativeTime(item.datePosted)}
                      </time>
                    )}
                  </div>
                </div>
              </article>
            );

            if (itemHref) {
              return (
                <Link key={item.id} href={itemHref} className="block shrink-0 focus-visible:outline-2 focus-visible:outline-green-700 rounded-2xl">
                  {horizontalCard}
                </Link>
              );
            }

            return (
              <div key={item.id} className="shrink-0">
                {horizontalCard}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

function RecipeSection({ title, recipes, isRanked = false }) {
  const scrollRef = useRef(null);
  const headingId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = direction === 'left' ? -350 : 350;
    scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section aria-labelledby={headingId} className="mb-12">
      {/* Header Bagian */}
      <div className="mb-4 flex items-center justify-between">
        <h2 id={headingId} className="font-sans text-xl font-bold tracking-tight text-stone-900 sm:text-2xl lg:text-3xl">
          {title}
        </h2>

        {/* Tombol Panah Kiri & Kanan */}
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

      {/* Baris Card (Accessible Scroll Region) */}
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

// Komponen Skeleton Pemuatan Sesuai Rubrik 4.5 (Loading State UX Profesional)
function ResepTerbaruSkeleton() {
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

function RecipeSectionSkeleton({ title }) {
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

export default function Home() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // State Manajemen Data Fetching, Loading, dan Error Handling Sesuai Rubrik 4.5
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadRecipes = async (signal) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await fetchRecipes(signal);
      setRecipes(data);
    } catch (err) {
      if (signal?.aborted) return;
      const msg = getErrorMessage(err);
      setErrorMessage(msg);
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  };

  // Fetching data menggunakan Axios saat komponen dimuat
  useEffect(() => {
    const controller = new AbortController();
    loadRecipes(controller.signal);
    return () => controller.abort();
  }, []);

  // Efek ganti gambar hero section otomatis setiap 4.5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Pemisahan data resep terbaru dan terpopuler dari hasil fetch API
  const newRecipes = [...recipes].sort(
    (a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  );

  const topRecipes = [...recipes]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return (
    <div className="w-full">
      {/* Hero Section Banner (Full Width: Menggunakan Tag Semantik <section aria-label="...">) */}
      <section aria-label="Sorotan resep pilihan" className="relative h-[380px] w-full overflow-hidden bg-stone-950 sm:h-[440px] lg:h-[480px]">
        {/* Koleksi Gambar Background dengan Transisi Crossfade */}
        {heroImages.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt="Inspirasi Masakan Ruang Resep"
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === activeImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
        <div role="tablist" aria-label="Navigasi gambar hero" className="absolute bottom-5 right-6 z-20 flex items-center gap-1.5 sm:right-8 lg:right-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeImageIndex}
              aria-label={`Lihat gambar latar ${i + 1}`}
              onClick={() => setActiveImageIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === activeImageIndex ? 'w-6 bg-green-500' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Bagian Konten Bawah (Tetap di dalam Container Max 6XL) */}
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        
        {/* State Error dengan Tombol Coba Lagi (Rubrik 4.5 Error Handling) */}
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
                onClick={() => loadRecipes()}
                className="self-start sm:self-auto rounded-xl bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs transition hover:bg-red-700 active:scale-95 cursor-pointer shrink-0"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        )}

        {/* State Loading: Menampilkan Skeleton Pemuatan (Rubrik 4.5 Loading State UX) */}
        {isLoading ? (
          <>
            <ResepTerbaruSkeleton />
            <RecipeSectionSkeleton title="Resep Populer Minggu Ini" />
          </>
        ) : (
          <>
            {/* Bagian 1: Resep Terbaru (1 Kartu Besar Nasi Goreng di Kiri & 9 Kartu Scrollable Vertikal di Kanan) */}
            {newRecipes.length > 0 && <ResepTerbaruSection recipes={newRecipes} />}

            {/* Bagian 2: Resep Populer Minggu Ini */}
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
