import { axiosClient } from '@/shared/lib/axiosClient';

export async function searchRecipes(params, signal) {
  const { data } = await axiosClient.get('/api/recipes/search', { params, signal });
  if (!Array.isArray(data?.recipes)) {
    throw new Error('Data resep tidak bisa dibaca. Silakan coba lagi.');
  }
  return data.recipes;
}
