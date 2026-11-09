import { axiosClient } from '@/shared/lib/axiosClient';

/**
 * Fetch daftar seluruh resep dari endpoint API lokal menggunakan Axios.
 * @param {AbortSignal} [signal] - Signal opsional untuk membatalkan request.
 * @returns {Promise<Array>} Array berisi data resep.
 */
export async function fetchRecipes(signal) {
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

