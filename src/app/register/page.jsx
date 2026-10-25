"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registrasi Berhasil! Silakan masuk.');
    router.push('/login');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4 relative"
      style={{ backgroundImage: "url('/food-register.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white shadow-2xl">
        <h1 className="text-3xl font-bold mb-1">Signup</h1>
        <p className="text-sm text-gray-200 mb-6">Create your account to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <input
              type="text"
              name="random_name_field"
              required
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-green-500"
              placeholder="Full Name"
            />
          </div>

          <div>
            <input
              type="email"
              name="random_email_field"
              required
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-green-500"
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              type="password"
              name="random_password_field"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/40 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:border-green-500"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl transition-colors shadow-lg mt-2 cursor-pointer"
          >
            Signup
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-200">
          Already have an account?{' '}
          <Link href="/login" className="font-bold underline hover:text-green-300">
            Login
          </Link>
        </p>

        <p className="mt-8 text-center text-xs text-gray-300">
          Created by <span className="italic font-semibold">anggidwiiputra</span>
        </p>
      </div>
    </div>
  );
}