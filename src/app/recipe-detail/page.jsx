import { redirect } from 'next/navigation';

// Link lama tanpa id: arahkan ke resep pertama.
export default function RecipeDetailIndex() {
  redirect('/recipe-detail/1');
}
