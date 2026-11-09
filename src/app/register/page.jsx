"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    if (!name.trim()) return 'Nama lengkap tidak boleh kosong.';
    if (name.trim().length < 3) return 'Nama lengkap minimal 3 karakter.';
    if (!email.trim()) return 'Email tidak boleh kosong.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Format email tidak valid.';
    if (!password) return 'Password tidak boleh kosong.';
    if (password.length < 6) return 'Password minimal 6 karakter.';
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Password harus mengandung huruf dan angka.';
    if (!confirmPassword) return 'Konfirmasi password tidak boleh kosong.';
    if (password !== confirmPassword) return 'Password dan konfirmasi password tidak sama.';
    return null;
  };

  const getPasswordStrength = () => {
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
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email,
        password,
      });

      if (response.data.token) {
        router.push('/login');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-8 relative"
      style={{ backgroundImage: "url('/food-register.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

      <main
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white shadow-2xl"
        role="main"
      >
        <h1 className="text-3xl font-bold mb-1">Sign Up</h1>
        <p className="text-sm text-gray-200 mb-6">
          Create your account to get started.
        </p>

        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-center gap-2 p-3 bg-red-500/80 text-white rounded-xl text-sm font-semibold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Register form">
          <div className="flex flex-col gap-1">
            <label htmlFor="register-name" className="text-sm font-medium text-gray-200">
              Nama Lengkap
            </label>
            <input
              id="register-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => { setName(e.target.value); if (error) setError(''); }}
              disabled={loading}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="register-email" className="text-sm font-medium text-gray-200">
              Email Address
            </label>
            <input
              id="register-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              disabled={loading}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
              placeholder="eve.holt@reqres.in"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="register-password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                id="register-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
                disabled={loading}
                className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
                placeholder="Minimal 6 karakter"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition focus:outline-none"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            {password && (
              <div className="mt-1" aria-live="polite" aria-label={`Kekuatan password: ${strength.label}`}>
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map((lvl) => (
                    <div
                      key={lvl}
                      className={`h-1 flex-1 rounded-full transition-all ${strength.level >= lvl ? strength.color : 'bg-white/20'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-300">
                  Kekuatan password:{' '}
                  <span className={`font-semibold ${strength.level === 1 ? 'text-red-400' : strength.level === 2 ? 'text-yellow-300' : 'text-green-400'}`}>
                    {strength.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="register-confirm" className="text-sm font-medium text-gray-200">
              Konfirmasi Password
            </label>
            <div className="relative">
              <input
                id="register-confirm"
                type={showConfirm ? 'text' : 'password'}
                name="confirmPassword"
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(''); }}
                disabled={loading}
                className={`w-full bg-white/10 border rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition ${confirmPassword && password !== confirmPassword ? 'border-red-400' : 'border-white/40'}`}
                placeholder="Ulangi password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                aria-label={showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition focus:outline-none"
              >
                {showConfirm ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-400 mt-1" role="alert">
                Password tidak cocok.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors shadow-lg mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Mendaftar...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-200">
          Already have an account?{' '}
          <Link href="/login" className="font-bold underline hover:text-green-300 focus:outline-none focus:ring-1 focus:ring-green-400 rounded">
            Login
          </Link>
        </p>
      </main>
    </div>
  );
}
