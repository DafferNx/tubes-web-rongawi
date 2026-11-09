import { categories } from '../data/categories.js';
import recipes from '../data/recipes.json' with { type: 'json' };

export function searchMockRecipes(request) {
  const { searchParams } = new URL(request.url);
  const keyword = (searchParams.get('keyword') ?? '').trim().toLowerCase();
  const category = searchParams.get('category') ?? '';

  if (keyword.length > 80 || (category && !categories.includes(category))) {
    return Response.json({ message: 'Kata kunci atau kategori tidak valid.' }, { status: 400 });
  }

  const results = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(keyword) &&
    (!category || recipe.category === category)
  );

  return Response.json({ recipes: results });
}
