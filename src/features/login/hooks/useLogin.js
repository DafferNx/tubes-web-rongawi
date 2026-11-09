'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../api/loginApi';

function validate(email, password) {
  if (!email.trim()) return 'Email tidak boleh kosong.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
  if (!password) return 'Password tidak boleh kosong.';
  if (password.length < 6) return 'Password minimal 6 karakter.';
  return null;
}

export function useLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });
      if (data.token) {
        router.push('/');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError('Email atau password salah.');
      } else if (status === 400) {
        setError('Email dan password wajib diisi.');
      } else if (!err.response) {
        setError('Tidak dapat terhubung ke server. Periksa koneksi internet kamu.');
      } else {
        setError(err.response?.data?.error || 'Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    email, setEmail,
    password, setPassword,
    error, setError,
    loading,
    showPassword, setShowPassword,
    handleSubmit,
  };
}
