'use client';
import { useState } from 'react';

const recipe = {
  title: 'Nasi Goreng Spesial',
  image: 'photo-1512058564366-18510be2db19',
  author: 'Budi Santoso',
  category: 'Makanan',
  ingredients: [
    '2 piring nasi putih',
    '2 butir telur',
    '3 siung bawang putih, cincang',
    '2 sdm kecap manis',
    '1 sdm saus tiram',
    'Garam dan merica secukupnya',
  ],
  steps: [
    'Panaskan minyak, tumis bawang putih hingga harum.',
    'Masukkan telur, orak-arik hingga setengah matang.',
    'Tambahkan nasi, aduk rata.',
    'Beri kecap manis, saus tiram, garam, dan merica. Aduk hingga matang.',
    'Angkat dan sajikan selagi hangat.',
  ],
};

const initialComments = [
  { id: 1, user: 'Siti', text: 'Enak banget, mudah dibuat!' },
  { id: 2, user: 'Andi', text: 'Aku tambah cabai, makin mantap.' },
];

export default function RecipeDetailPage() {
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setComments([...comments, { id: Date.now(), user: 'Anda', text }]);
    setText('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <p className="text-sm text-green-700">{recipe.category}</p>
      <h1 className="text-3xl font-bold text-green-800 mb-2">{recipe.title}</h1>
      <p className="text-gray-500 mb-6">Dibuat oleh <span className="font-medium text-stone-700">{recipe.author}</span></p>

      <img src={`https://images.unsplash.com/${recipe.image}?w=1000`} alt={recipe.title} className="w-full h-72 sm:h-96 object-cover rounded-lg mb-8" />

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
        <h2 className="text-xl font-bold mb-3">Bahan-bahan</h2>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </section>

      <section className="bg-white border border-gray-200 rounded-lg p-5 mb-10">
        <h2 className="text-xl font-bold mb-3">Langkah Memasak</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {recipe.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Komentar ({comments.length})</h2>
        <div className="space-y-3 mb-6">
          {comments.map((c) => (
            <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="font-semibold text-green-800">{c.user}</p>
              <p className="text-stone-700">{c.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor="komentar" className="block font-semibold">Tulis komentar</label>
          <textarea id="komentar" rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Tulis komentarmu di sini..." className="w-full border border-gray-300 rounded-lg p-3 bg-white" />
          <button type="submit" className="rounded-lg bg-green-800 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-900">Kirim</button>
        </form>
      </section>
    </div>
  );
}