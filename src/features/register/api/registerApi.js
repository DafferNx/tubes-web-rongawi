import { axiosClient } from '@/shared/lib/axiosClient';

export async function registerUser({ name, email, password }) {
  const response = await axiosClient.post('/api/auth/register', { name, email, password });
  return response.data;
}
