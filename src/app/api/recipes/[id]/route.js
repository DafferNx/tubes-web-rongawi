import { getMockRecipe } from '@/features/recipe-detail/server';

export async function GET(_request, { params }) {
  const { id } = await params;
  return getMockRecipe(id);
}
