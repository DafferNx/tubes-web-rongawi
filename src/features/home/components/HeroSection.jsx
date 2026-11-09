'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const heroImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1920&q=80',
];

export default function HeroSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section aria-label="Sorotan resep pilihan" className="relative h-[380px] w-full overflow-hidden bg-stone-950 sm:h-[440px] lg:h-[480px]">
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

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:via-black/50" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

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
  );
}

