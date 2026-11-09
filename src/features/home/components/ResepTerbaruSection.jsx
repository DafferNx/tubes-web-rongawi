'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { formatRelativeTime } from '@/shared/lib/dateUtils';
import StarRating from './StarRating';

export default function ResepTerbaruSection({ recipes }) {
  const featuredRecipe = recipes[0];
  const sideRecipes = recipes.slice(1, 10);

  const leftCardRef = useRef(null);
  const [matchedHeight, setMatchedHeight] = useState(null);

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
      <div className="mb-6">
        <h2 id="judul-resep-terbaru" className="font-sans text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Resep Terbaru
        </h2>
        <p className="mt-1 text-xs text-stone-500 sm:text-sm">
          Berbagai ide masak baru hadir setiap hari untuk sajian spesial keluarga tercinta!
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
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
                <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-stone-100 sm:w-28 sm:aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sideImg}
                    alt={`Foto masakan ${item.name}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

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

