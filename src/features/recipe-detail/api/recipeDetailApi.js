import { axiosClient } from '@/shared/lib/axiosClient';

// Repository: satu-satunya tempat yang tahu endpoint resep & komentar.
export async function getRecipeById(id, signal) {
  const { data } = await axiosClient.get(`/api/recipes/${id}`, { signal });
  if (!data?.recipe) {
    throw new Error('Data resep tidak bisa dibaca. Silakan coba lagi.');
  }
  return data.recipe;
}

export async function getComments(id, signal) {
  const { data } = await axiosClient.get(`/api/recipes/${id}/comments`, { signal });
  if (!Array.isArray(data?.comments)) {
    throw new Error('Data komentar tidak bisa dibaca. Silakan coba lagi.');
  }
  return data.comments;
}

export async function postComment(id, payload) {
  const { data } = await axiosClient.post(`/api/recipes/${id}/comments`, payload);
  return data.comment;
}
