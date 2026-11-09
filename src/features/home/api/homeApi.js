import { axiosClient } from '@/shared/lib/axiosClient';

export async function getHomeRecipes(signal) {
  const response = await axiosClient.get('/api/recipes', { signal });
  const data = response.data;

  if (Array.isArray(data?.recipes)) {
    return data.recipes;
  }
  if (Array.isArray(data)) {
    return data;
  }

  throw new Error('Format data resep dari server tidak sesuai.');
}

