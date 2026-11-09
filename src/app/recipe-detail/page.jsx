import { redirect } from 'next/navigation';

// Halaman lama tanpa id: arahkan ke daftar pencarian.
export default function RecipeDetailIndex() {
  redirect('/search');
}
