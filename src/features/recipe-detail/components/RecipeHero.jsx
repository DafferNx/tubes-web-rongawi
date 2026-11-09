import Link from 'next/link';
import { Badge } from '@/shared/ui/SearchPrimitives';

const ICONS = {
  star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z',
  eye: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  users: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2',
  flame: 'M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9Z',
};

function MetaItem({ icon, label, value }) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 sm:px-5">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
        strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-green-700">
        <path d={ICONS[icon]} />
      </svg>
      <div>
        <p className="text-xs text-stone-500">{label}</p>
        <p className="text-sm font-semibold text-green-950">{value}</p>
      </div>
    </li>
  );
}

export function RecipeHero({ recipe }) {
  const meta = [
    { icon: 'clock', label: 'Waktu', value: `${recipe.duration} menit` },
    { icon: 'users', label: 'Porsi', value: `${recipe.servings} orang` },
    { icon: 'flame', label: 'Tingkat', value: recipe.difficulty },
    { icon: 'star', label: 'Rating', value: recipe.rating.toLocaleString('id-ID') },
    { icon: 'eye', label: 'Dilihat', value: recipe.views.toLocaleString('id-ID') },
  ];

  return (
    <header>
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-stone-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li><Link href="/" className="rounded hover:text-green-800 hover:underline focus-visible:outline-2 focus-visible:outline-green-700">Beranda</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/search" className="rounded hover:text-green-800 hover:underline focus-visible:outline-2 focus-visible:outline-green-700">Cari Resep</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-green-950">{recipe.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center">
        <div>
          <Badge>{recipe.category}</Badge>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-[#234332] sm:text-5xl">{recipe.name}</h1>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-stone-600">{recipe.description}</p>

          <p className="mt-6 flex items-center gap-3 text-sm text-stone-600">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-green-800 font-serif text-lg text-white">
              {recipe.author.charAt(0).toUpperCase()}
            </span>
            <span>Resep oleh <strong className="font-semibold text-green-950">{recipe.author}</strong></span>
          </p>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=1100&h=760&q=80`}
          alt={`Hidangan ${recipe.name}`}
          width={1100}
          height={760}
          className="aspect-[3/2] w-full rounded-3xl bg-green-50 object-cover shadow-lg"
        />
      </div>

      <ul className="mt-8 grid grid-cols-2 divide-green-100 overflow-hidden rounded-2xl border border-green-100 bg-white sm:grid-cols-3 lg:grid-cols-5 lg:divide-x [&>li]:border-b [&>li]:border-green-100 lg:[&>li]:border-b-0">
        {meta.map((item) => <MetaItem key={item.label} {...item} />)}
      </ul>
    </header>
  );
}
