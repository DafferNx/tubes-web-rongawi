import recipes from '@/features/search/data/recipes.json';

export async function GET() {
  // Simulasi respons API resep
  return Response.json({
    success: true,
    recipes,
    total: recipes.length,
  });
}

