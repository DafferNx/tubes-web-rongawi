"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ── Client-side validation ──────────────────────────────────────────────────
  const validate = () => {
    if (!email.trim()) {
      return 'Email tidak boleh kosong.';
    }
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Format email tidak valid.';
    }
    if (!password) {
      return 'Password tidak boleh kosong.';
    }
    if (password.length < 6) {
      return 'Password minimal 6 karakter.';
    }
    return null; // no error
  };

  // ── Submit handler ──────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Run client-side validation first
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Simulate async login (e.g. API call delay)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const dummyEmail = 'user@gmail.com';
      const dummyPass = '123456';

      if (email === dummyEmail && password === dummyPass) {
        router.push('/');
      } else {
        setError('Email atau password salah. Coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('/food-login.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>

      {/* Card */}
      <main
        className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white shadow-2xl"
        role="main"
      >
        <h1 className="text-3xl font-bold mb-1">Login</h1>
        <p className="text-sm text-gray-200 mb-6">
          Welcome back! Please login to your account.
        </p>

        {/* ── Error State ─────────────────────────────────────────────────── */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-center gap-2 p-3 bg-red-500/80 text-white rounded-xl text-sm font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
          aria-label="Login form"
        >
          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="login-email"
              className="text-sm font-medium text-gray-200"
            >
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              disabled={loading}
              aria-describedby={error ? 'login-error' : undefined}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
              placeholder="user@gmail.com"
            />
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="login-password"
              className="text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                disabled={loading}
                className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
                placeholder="Minimal 6 karakter"
              />
              {/* Show/Hide password toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition focus:outline-none"
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ── Submit Button with Loading State ────────────────────────── */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors shadow-lg mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-200">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-bold underline hover:text-green-300 focus:outline-none focus:ring-1 focus:ring-green-400 rounded"
          >
            Sign up
          </Link>
        </p>
      </main>
    </div>
  );
}
