"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const dummyEmail = "user@gmail.com";
    const dummyPass = "123456";

    if (email === dummyEmail && password === dummyPass) {
      alert('Login Berhasil!');
      router.push('/');
    } else {
      setError('Email atau password salah!');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Masuk</h1>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-600 rounded text-sm text-center font-semibold">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block font-semibold mb-1">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="user@gmail.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-semibold mb-1">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="123456"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 mt-4"
        >
          Masuk
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Belum punya akun?{' '}
        <Link href="/register" className="text-blue-600 font-semibold hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}