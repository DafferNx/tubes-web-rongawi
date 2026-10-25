'use client';
import { useState } from 'react';

const categories = ['Semua', 'Makanan', 'Dessert', 'Minuman'];
const recipes = [
  { name: 'Nasi Goreng', category: 'Makanan', image: 'photo-1512058564366-18510be2db19' },
  { name: 'Kue Cokelat', category: 'Dessert', image: 'photo-1578985545062-69928b1d9587' },
  { name: 'Es Lemon', category: 'Minuman', image: 'photo-1544145945-f90425340c7e' },
];

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const results = recipes.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === 'Semua' || r.category === category)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-2">Cari Resep</h1>
      <p className="text-gray-500 mb-6">Inspirasi masakan untuk harimu.</p>
      <div className="flex flex-wrap gap-3">
        <input aria-label="Cari resep" placeholder="Cari resep..." value={search} onChange={(e) => setSearch(e.target.value)} className="border border-gray-300 rounded-lg p-3 bg-white flex-1 min-w-0" />
        <select aria-label="Kategori" value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-300 rounded-lg p-3 bg-white">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <p className="text-sm text-gray-500 my-5">Riwayat contoh: Nasi Goreng · Kue Cokelat · Es Lemon</p>
      <h2 className="text-xl font-bold mb-4">Pilihan Resep</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {results.map((r) => (
          <div key={r.name} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://images.unsplash.com/${r.image}?w=400`} alt={r.name} className="w-full h-40 object-cover" />
            <div className="p-4"><p className="text-sm text-green-700">{r.category}</p><h3 className="font-bold">{r.name}</h3></div>
          </div>
        ))}
      </div>
      {results.length === 0 && <p>Resep tidak ditemukan.</p>}
    </div>
  );
}
