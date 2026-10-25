
import Link from "next/link";

// Data dummy (nanti diganti dengan GET /api/recipes)
const recipes = [
  {
    id: 1,
    title: 'Nasi Goreng Kampung',
    author: 'Budi',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600',
  },
  {
    id: 2,
    title: 'Sate Ayam Madura',
    author: 'Siti',
    image: 'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600',
  },
  {
    id: 3,
    title: 'Mie Goreng Spesial',
    author: 'Andi',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600',
  },
  {
    id: 4,
    title: 'Soto Ayam Lamongan',
    author: 'Rina',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
  },
  {
    id: 5,
    title: 'Pancake Pisang',
    author: 'Dewi',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600',
  },
  {
    id: 6,
    title: 'Salad Sayur Segar',
    author: 'Joko',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      {/* Hero Section */}
      <section className="mb-10 rounded-2xl bg-green-800 px-8 py-14 text-center text-white">
        <h1 className="mb-3 text-3xl font-bold">Selamat Datang di Ruang Resep</h1>
        <p className="mb-6 text-green-100">
          Temukan dan bagikan resep masakan favoritmu bersama pengguna lain.
        </p>
        <Link
          href="/search"
          className="rounded-lg bg-white px-6 py-3 font-medium text-green-800 hover:bg-green-50"
        >
          Cari Resep
        </Link>
      </section>

      {/* Feed / Grid Postingan */}
      <section>
        <h2 className="mb-5 text-2xl font-bold text-stone-800">Resep Terbaru</h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-stone-800">{recipe.title}</h3>
                <p className="mb-4 text-sm text-stone-500">oleh {recipe.author}</p>
                <Link
                  href=""
                  className="inline-block rounded-lg bg-green-800 px-4 py-2 text-sm font-medium text-white hover:bg-green-900"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
