'use client';

import Link from 'next/link';
import { useRegister } from '../hooks/useRegister';

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export function RegisterForm() {
  const {
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
  } = useRegister();

  return (
    <div className="flex min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-4.5rem)]">

      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative bg-green-950 overflow-hidden flex-col justify-between">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/food-register.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/75 via-green-950/60 to-black/80" aria-hidden="true" />

        <div className="relative z-10 flex flex-col justify-center flex-1 px-10 xl:px-14 text-white">
          <div className="mb-10">
            <span className="text-5xl" aria-hidden="true">🍴</span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-extrabold mb-3 leading-tight">
            Bergabung Sekarang<span className="text-green-400">.</span>
          </h2>
          <p className="text-green-200 text-base xl:text-lg mb-10 leading-relaxed">
            Daftarkan dirimu dan mulai bagikan resep terbaik ke komunitas.
          </p>

          <div className="space-y-5">
            {[
              { icon: '📖', title: 'Simpan Resep Favoritmu', desc: 'Koleksi resep dari ribuan kontributor.' },
              { icon: '✍️', title: 'Tulis & Bagikan', desc: 'Bagikan resep andalanmu ke komunitas.' },
              { icon: '🌟', title: 'Dapatkan Apresiasi', desc: 'Rating dan komentar dari sesama pemasak.' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white text-sm">{item.title}</p>
                  <p className="text-green-300 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 px-10 xl:px-14 pb-8 text-xs text-green-500">
          © 2025 Ruang Resep. All rights reserved.
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10 bg-stone-50 overflow-y-auto">
        <div className="w-full max-w-sm">

          <div className="lg:hidden mb-8 text-center">
            <span className="text-xl font-bold text-green-800">🍴 Ruang Resep</span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Buat Akun Baru</h1>
            <p className="text-sm text-gray-500">Isi data di bawah untuk mendaftar.</p>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-red-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate aria-label="Register form">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-name" className="text-sm font-semibold text-gray-700">
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-email" className="text-sm font-semibold text-gray-700">
                Email
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
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
                placeholder="email@contoh.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-password" className="text-sm font-semibold text-gray-700">
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
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition"
                  placeholder="Min. 6 karakter, huruf & angka"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {password && (
                <div aria-live="polite" aria-label={`Kekuatan password: ${strength.label}`}>
                  <div className="flex gap-1 mt-1 mb-1">
                    {[1, 2, 3].map((lvl) => (
                      <div
                        key={lvl}
                        className={`h-1 flex-1 rounded-full transition-all ${strength.level >= lvl ? strength.color : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    Kekuatan:{' '}
                    <span className={`font-semibold ${strength.level === 1 ? 'text-red-500' : strength.level === 2 ? 'text-yellow-500' : 'text-green-600'}`}>
                      {strength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="register-confirm" className="text-sm font-semibold text-gray-700">
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
                  className={`w-full border rounded-xl px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:opacity-50 transition ${confirmPassword && password !== confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
                  placeholder="Ulangi password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition focus:outline-none"
                >
                  {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 mt-0.5" role="alert">
                  Password tidak cocok.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-800 hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors shadow-sm mt-2 cursor-pointer text-sm"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Mendaftar...</span>
                </>
              ) : (
                'Daftar Sekarang'
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-semibold text-green-700 hover:underline focus:outline-none focus:ring-1 focus:ring-green-500 rounded">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
