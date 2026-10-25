'use client';

import Link from 'next/link';
import { useState } from 'react';

const initialRecipes = [
  {
    id: 1,
    title: 'Nasi Goreng Kampung',
    category: 'Makanan utama',
    description: 'Nasi goreng sederhana dengan aroma terasi dan bumbu rumahan yang selalu bikin kangen.',
    image: 'photo-1512058564366-18510be2db19',
    time: '25 menit',
    date: '12 Okt 2026',
  },
  {
    id: 2,
    title: 'Pancake Pisang Madu',
    category: 'Sarapan',
    description: 'Pancake lembut dengan pisang manis dan madu untuk memulai hari dengan ceria.',
    image: 'photo-1528207776546-365bb710ee93',
    time: '20 menit',
    date: '8 Okt 2026',
  },
  {
    id: 3,
    title: 'Sup Ayam Jahe',
    category: 'Makanan utama',
    description: 'Sup hangat berkuah bening, kaya rempah, pas dinikmati bersama keluarga.',
    image: 'photo-1547592180-85f173990554',
    time: '45 menit',
    date: '2 Okt 2026',
  },
];

function Icon({ name, className = 'h-4 w-4' }) {
  const paths = {
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    edit: <><path d="m14 5 5 5" /><path d="M4 20h4l11-11a2.1 2.1 0 0 0-4-4L4 16v4Z" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z" /><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8" /></>,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
    close: <><path d="m18 6-12 12M6 6l12 12" /></>,
  };
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function ProfilePage() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [filter, setFilter] = useState('Semua resep');
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');

  const visibleRecipes = filter === 'Semua resep' ? recipes : recipes.filter((recipe) => recipe.category === filter);

  const removeRecipe = (id) => {
    setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    setNotice('Resep berhasil dihapus dari daftar contoh.');
  };

  const saveRecipe = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setRecipes((current) => current.map((recipe) => recipe.id === editing.id
      ? { ...recipe, title: form.get('title'), description: form.get('description') }
      : recipe));
    setEditing(null);
    setNotice('Perubahan resep tersimpan di tampilan ini.');
  };

  return (
    <div data-testid="profile-page" className="min-h-full bg-stone-50 pb-12">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <h1 className="mb-6 text-2xl font-bold text-stone-900">Profil Saya</h1>

        <section aria-label="Informasi profil" className="mb-8 flex flex-col gap-5 rounded-xl border border-stone-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-green-100 text-xl font-bold text-green-900" role="img" aria-label="Foto profil Dinda Putri">DP</div>
            <div>
              <h2 data-testid="profile-name" className="text-xl font-bold text-stone-900">Dinda Putri</h2>
              <p data-testid="profile-email" className="mt-1 text-sm text-stone-600">dinda.putri@email.com</p>
              <p className="mt-2 text-sm text-stone-500">Jumlah resep: <strong data-testid="recipe-count" className="text-stone-800">{recipes.length}</strong></p>
            </div>
          </div>
          <Link href="/login" className="inline-flex w-fit items-center gap-2 rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-green-900">
            <Icon name="logout" /> Keluar akun
          </Link>
        </section>

        <section aria-labelledby="my-recipes-title">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 id="my-recipes-title" className="text-2xl font-bold text-stone-900">Resep Saya</h2>
              <p className="mt-1 text-sm text-stone-600">Kelola resep yang sudah kamu buat.</p>
            </div>
            <Link href="/add-recipe" className="inline-flex w-fit items-center justify-center rounded-lg bg-green-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-900">+ Tambah Resep</Link>
          </div>

          {notice && <div data-testid="profile-notice" role="status" className="mb-5 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900"><span>{notice}</span><button type="button" aria-label="Tutup pemberitahuan" onClick={() => setNotice('')}><Icon name="close" /></button></div>}

          <div className="mb-5 flex flex-col gap-2 sm:max-w-xs">
            <label htmlFor="recipe-filter" className="text-sm font-semibold text-stone-700">Filter kategori</label>
            <select id="recipe-filter" data-testid="recipe-filter" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10">
              {['Semua resep', 'Makanan utama', 'Sarapan'].map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>

          {visibleRecipes.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleRecipes.map((recipe) => (

              <article key={recipe.id} data-testid={`recipe-card-${recipe.id}`} className="overflow-hidden rounded-xl border border-stone-200 bg-white">

                <img src={`https://images.unsplash.com/${recipe.image}?auto=format&fit=crop&w=900&q=85`} alt={recipe.title} className="h-40 w-full bg-stone-100 object-cover" />
                <div className="p-4">
                  <p className="text-xs font-semibold text-green-800">{recipe.category} · {recipe.time}</p>
                  <h3 className="mt-1 text-lg font-bold text-stone-900">{recipe.title}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-stone-600">{recipe.description}</p>
                  <p className="mt-3 text-xs text-stone-500">Dibagikan {recipe.date}</p>
                  <div className="mt-4 flex gap-2 border-t border-stone-100 pt-3">
                    <button type="button" aria-label={`Edit resep ${recipe.title}`} onClick={() => setEditing(recipe)} className="flex-1 rounded-lg border border-green-800 px-3 py-2 text-sm font-semibold text-green-900 hover:bg-green-50"><span className="inline-flex items-center justify-center gap-1.5"><Icon name="edit" /> Edit</span></button>
                    <button type="button" aria-label={`Hapus resep ${recipe.title}`} onClick={() => removeRecipe(recipe.id)} className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 hover:border-red-300 hover:bg-red-50 hover:text-red-700"><span className="inline-flex items-center justify-center gap-1.5"><Icon name="trash" /> Hapus</span></button>
                  </div>
                </div>
              </article>
            ))}
          </div> : <div data-testid="recipe-empty-state" className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center">
            <h3 className="text-lg font-bold text-stone-900">Belum ada resep di kategori ini</h3>
            <p className="mt-2 text-sm text-stone-600">Pilih kategori lain atau tambahkan resep baru.</p>
            <Link href="/add-recipe" className="mt-4 inline-flex rounded-lg bg-green-800 px-4 py-2 text-sm font-semibold text-white hover:bg-green-900">+ Tambah Resep</Link>
          </div>}
        </section>
      </div>

      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}>
        <form data-testid="edit-recipe-dialog" role="dialog" aria-modal="true" onSubmit={saveRecipe} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8" aria-labelledby="edit-recipe-title">
          <div className="mb-6 flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-green-800">Koleksi pribadi</p><h2 id="edit-recipe-title" className="mt-1 font-serif text-2xl font-bold text-stone-900">Edit resep</h2></div><button type="button" onClick={() => setEditing(null)} aria-label="Tutup" className="rounded-full p-2 text-stone-500 hover:bg-stone-100"><Icon name="close" /></button></div>
          <label htmlFor="edit-recipe-name" className="mb-4 block text-sm font-semibold text-stone-700">Nama resep<input id="edit-recipe-name" data-testid="edit-recipe-name" name="title" required defaultValue={editing.title} className="mt-2 w-full rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10" /></label>
          <label htmlFor="edit-recipe-description" className="mb-6 block text-sm font-semibold text-stone-700">Deskripsi<textarea id="edit-recipe-description" data-testid="edit-recipe-description" name="description" required rows="3" defaultValue={editing.description} className="mt-2 w-full resize-y rounded-xl border border-stone-300 px-4 py-3 font-normal outline-none focus:border-green-800 focus:ring-2 focus:ring-green-800/10" /></label>
          <div className="flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50">Batal</button><button type="submit" className="rounded-xl bg-green-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-900">Simpan perubahan</button></div>
        </form>
      </div>}
    </div>
  );
}