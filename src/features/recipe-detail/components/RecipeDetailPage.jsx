'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useRecipeDetail } from '../hooks/useRecipeDetail';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { Button } from '@/shared/ui/Button';
import { RecipeHero } from './RecipeHero';
import { IngredientList } from './IngredientList';
import { StepList } from './StepList';
import { CommentSection } from './CommentSection';
import { RecipeDetailSkeleton } from './RecipeDetailSkeleton';

// Container: hanya menyambungkan data (hook) ke komponen tampilan.
export default function RecipeDetailPage() {
  const { id } = useParams();
  const { status, recipe, error, notFound, retry } = useRecipeDetail(id);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {status === 'loading' && <RecipeDetailSkeleton />}

      {status === 'error' && (
        <div className="mx-auto max-w-xl py-16 text-center">
          <h1 className="font-serif text-3xl font-bold text-[#234332]">
            {notFound ? 'Resep tidak ditemukan' : 'Resep gagal dimuat'}
          </h1>
          <div className="mt-6 text-left">
            <ErrorAlert message={error} onRetry={notFound ? undefined : retry} />
          </div>
          <Button href="/search">Cari resep lain</Button>
        </div>
      )}

      {status === 'success' && (
        <article>
          <RecipeHero recipe={recipe} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[360px_1fr] lg:items-start">
            <IngredientList ingredients={recipe.ingredients} />
            <StepList steps={recipe.steps} />
          </div>
          <CommentSection recipeId={recipe.id} />
        </article>
      )}
    </div>
  );
}
