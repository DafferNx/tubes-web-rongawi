import Link from 'next/link';
import { Badge, Card, CardContent } from '@/shared/ui/SearchPrimitives';
import { formatRelativeTime } from '@/shared/lib/dateUtils';

export default function RecipeCard({ recipe, href }) {
  const rating = recipe.rating ?? 4.8;
  const comments = recipe.comments ?? 0;
  const views = recipe.views ?? 0;
  const cookingTime = typeof recipe.cookingTime === 'number'
    ? `${recipe.cookingTime} menit`
    : recipe.cookingTime;
  const postedText = formatRelativeTime(recipe.datePosted);

  const stats = [
    { path: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z', value: rating.toLocaleString('id-ID'), label: 'bintang' },
    { path: 'M21 11.5a8.5 8.5 0 0 1-8.5 8.5 9 9 0 0 1-3.8-.8L3 21l1.8-5.7a8.5 8.5 0 1 1 16.2-3.8Z', value: comments, label: 'komentar' },
    { path: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z', value: views.toLocaleString('id-ID'), label: 'dilihat' },
  ];

  const imageUrl = recipe.image?.startsWith('http')
    ? recipe.image
    : `https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=640&h=420&q=80`;

  const targetHref = href ?? (recipe.name?.toLowerCase().includes('nasi goreng') ? '/recipe-detail' : undefined);

  const cardElement = (
    <Card className={`flex h-full flex-col overflow-hidden transition-all duration-200 ${targetHref ? 'cursor-pointer hover:-translate-y-1 hover:shadow-md' : ''}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        width={640}
        height={420}
        loading="lazy"
        className="aspect-[16/10] w-full bg-green-50 object-cover"
      />
      <CardContent className="flex-1">
        <div className="flex items-center justify-between gap-2">
          {/* shadcn Badge: label kategori. */}
          {recipe.category ? <Badge>{recipe.category}</Badge> : <div />}
          {cookingTime && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-stone-400">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {cookingTime}
            </span>
          )}
        </div>
        <h3 className="mt-2 font-serif text-2xl font-bold text-[#234332]">{recipe.name || recipe.title}</h3>
        <p className="mt-2 text-sm text-stone-600">Resep dari {recipe.author}</p>
        {postedText && (
          <p suppressHydrationWarning className="mt-1 text-xs text-stone-500">
            {postedText}
          </p>
        )}
      </CardContent>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 border-t border-green-100 bg-green-50/60 px-4 py-3 text-xs text-green-950">
        {stats.map(({ path, value, label }) => (
          <li key={label} className="inline-flex items-center gap-1.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-green-700">
              <path d={path} />
            </svg>
            {value} {label}
          </li>
        ))}
      </ul>
    </Card>
  );

  if (targetHref) {
    return (
      <Link href={targetHref} className="block h-full group focus-visible:outline-2 focus-visible:outline-green-700 rounded-2xl">
        {cardElement}
      </Link>
    );
  }

  return cardElement;
}
