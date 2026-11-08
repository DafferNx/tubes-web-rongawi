import { axiosClient } from '@/shared/lib/axiosClient';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Ambil daftar kategori (GET)
export async function getCategories() {
  const response = await axiosClient.get('/mock/categories.json');
  return response.data;
}

// Simpan resep baru (POST)
export async function saveRecipe(recipeData) {
  const response = await axiosClient.post(API_URL, recipeData);
  return response.data;
}
