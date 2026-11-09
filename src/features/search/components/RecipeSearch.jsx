'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Fields';
import { Alert, Card, CardContent, Skeleton } from '@/shared/ui/SearchPrimitives';
import CategoryDropdown from './CategoryDropdown';
import { useRecipeSearch } from '../hooks/useRecipeSearch';
import RecipeCard from './RecipeCard';
import RecipeCarousel from './RecipeCarousel';

export default function RecipeSearch() {
  const { filters, result, updateFilters } = useRecipeSearch();
  const [history, setHistory] = useState([]);
  const hasFilters = Boolean(filters.keyword || filters.category);
  const recipes = result?.recipes ?? [];
  const isLoading = !result;
  const resultTitle = filters.category || (hasFilters ? 'Hasil pencarian' : 'Semua resep');

  function search(keyword) {
    const term = keyword.trim();
    updateFilters({ ...filters, keyword: term });
    if (!term) return;
    setHistory((previous) => {
      const otherTerms = previous.filter((item) => item.toLowerCase() !== term.toLowerCase());
      return [term, ...otherTerms].slice(0, 5);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search(filters.keyword);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <section aria-labelledby="search-title" className="rounded-t-2xl bg-green-800 px-5 pt-7 pb-3 text-green-50 sm:px-8">
        <h1 id="search-title" className="font-serif text-4xl tracking-tight sm:text-5xl">Jelajahi resep</h1>
        <p className="mt-2 text-sm text-green-100">Temukan ide masak dari komunitas Ruang Resep.</p>
      </section>

      <form role="search" className="sticky top-16 z-30 grid grid-cols-[minmax(0,1fr)_auto] gap-2 rounded-b-2xl bg-green-800 px-5 pt-2 pb-4 shadow-sm sm:grid-cols-[minmax(0,1fr)_11rem_auto] sm:px-8 lg:top-[4.5rem]"
        onSubmit={handleSubmit}>
        {/* shadcn Input: kata kunci resep. */}
        <Input aria-label="Nama resep" type="search" placeholder="Cari nama hidangan" maxLength={80}
          value={filters.keyword} className="col-span-2 px-3 sm:col-span-1"
          onChange={(event) => updateFilters({ ...filters, keyword: event.target.value })} />
        {/* shadcn Select: filter kategori. */}
        <CategoryDropdown value={filters.category}
          onChange={(category) => updateFilters({ ...filters, category })} />
        {/* shadcn Button: kirim pencarian. */}
        <Button type="submit" className="border border-green-200">Cari</Button>
      </form>

      {/* shadcn Button: pilih atau hapus riwayat. */}
      {history.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 border-b border-green-100 pb-3">
          <span className="text-sm font-semibold text-green-950">Riwayat</span>
          {history.map((term) => (
            <Button key={term} variant="ghost" className="max-w-full min-w-0 bg-green-50" onClick={() => search(term)}>
              <span className="truncate">{term}</span>
            </Button>
          ))}
          <Button variant="ghost" onClick={() => setHistory([])}>Hapus riwayat</Button>
        </div>
      )}

      {!hasFilters && recipes.length > 1 && (
        <RecipeCarousel recipes={recipes} onSearch={search} />
      )}

      <section aria-labelledby="results-title" className="mt-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-green-200 pb-3">
          <div>
            <h2 id="results-title" className="font-serif text-3xl text-green-950">{resultTitle}</h2>
            <p role="status" className="mt-1 text-sm text-stone-600">
              {/* shadcn Skeleton: placeholder saat memuat. */}
              {isLoading && 'Mencari resep…'}
              {result?.recipes && `${recipes.length} resep ditemukan`}
            </p>
          </div>
          {/* shadcn Button: reset filter. */}
          {hasFilters && (
            <Button variant="ghost" onClick={() => updateFilters({ keyword: '', category: '' })}>Reset filter</Button>
          )}
        </div>

        {/* shadcn Alert: pesan error dan coba lagi. */}
        {result?.message && (
          <Alert>
            <p>{result.message}</p>
            {/* shadcn Button: ulangi request. */}
            <Button variant="ghost" onClick={() => updateFilters({ ...filters })}>Coba Lagi</Button>
          </Alert>
        )}
        {/* shadcn Card: hasil kosong. */}
        {result?.recipes && recipes.length === 0 && (
          <Card>
            <CardContent className="text-center text-green-950">
              Belum ada resep yang cocok. Coba kata kunci atau kategori lain.
            </CardContent>
          </Card>
        )}
        {(isLoading || recipes.length > 0) && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* shadcn Skeleton: placeholder saat memuat. */}
            {isLoading && [1, 2, 3].map((item) => (
              <Skeleton key={item} className="aspect-[4/3]" />
            ))}
            {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
          </div>
        )}
      </section>
    </div>
  );
}
