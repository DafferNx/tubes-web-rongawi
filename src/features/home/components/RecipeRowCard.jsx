import Link from 'next/link';
import { formatRelativeTime } from '@/shared/lib/dateUtils';
import StarRating from './StarRating';

export default function RecipeRowCard({ recipe, rank }) {
  const imageUrl = recipe.image?.startsWith('http')
    ? recipe.image
    : `https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=500&h=500&q=80`;

  const isNasiGoreng = recipe.name?.toLowerCase().includes('nasi goreng');
  const targetHref = isNasiGoreng ? '/recipe-detail' : undefined;

  const cardContent = (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${targetHref ? 'cursor-pointer' : ''}`}>
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={`Foto masakan ${recipe.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {rank && (
          <span
            aria-label={`Peringkat ${rank}`}
            className="absolute left-2.5 top-2.5 z-10 flex size-9 items-center justify-center rounded-full bg-[#200e3f] text-base font-black text-white shadow-md ring-2 ring-white/70 sm:size-10 sm:text-lg"
          >
            {rank}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <h3 className="line-clamp-2 text-sm font-bold text-stone-900 transition-colors group-hover:text-green-800 sm:text-base leading-snug">
          {recipe.name}
        </h3>

        <div className="mt-1">
          <StarRating rating={recipe.rating} comments={recipe.comments} />
        </div>

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

        <p className="mt-1 text-[11px] text-stone-500 sm:text-xs">
          Oleh <span className="font-semibold text-stone-800">{recipe.author}</span>
        </p>

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

