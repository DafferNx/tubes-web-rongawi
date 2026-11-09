import { axiosClient } from '@/shared/lib/axiosClient';

export async function loginUser({ email, password }) {
  const response = await axiosClient.post('/api/auth/login', { email, password });
  return response.data;
}
