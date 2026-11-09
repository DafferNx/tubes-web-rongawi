'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser } from '../api/registerApi';

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: 'Lemah', color: 'bg-red-500' };
  if (score <= 3) return { level: 2, label: 'Sedang', color: 'bg-yellow-400' };
  return { level: 3, label: 'Kuat', color: 'bg-green-500' };
}

function validate(name, email, password, confirmPassword) {
  if (!name.trim()) return 'Nama lengkap tidak boleh kosong.';
  if (name.trim().length < 3) return 'Nama lengkap minimal 3 karakter.';
  if (!email.trim()) return 'Email tidak boleh kosong.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid.';
  if (!password) return 'Password tidak boleh kosong.';
  if (password.length < 6) return 'Password minimal 6 karakter.';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Password harus mengandung huruf dan angka.';
  if (!confirmPassword) return 'Konfirmasi password tidak boleh kosong.';
  if (password !== confirmPassword) return 'Password dan konfirmasi password tidak sama.';
  return null;
}

export function useRegister() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate(name, email, password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      if (data.token) {
        router.push('/login');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError('Email sudah terdaftar. Silakan gunakan email lain.');
      } else if (status === 400) {
        setError('Semua field wajib diisi dengan benar.');
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
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error, setError,
    loading,
    showPassword, setShowPassword,
    showConfirm, setShowConfirm,
    strength,
    handleSubmit,
  };
}
