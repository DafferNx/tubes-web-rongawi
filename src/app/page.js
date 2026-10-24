import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Website Forum Resep</h1>
      <p className="mb-4">
        <Link href="/search" className="text-blue-600 font-medium hover:underline">
          Cari Resep
        </Link>
      </p>
      <Link href="/add-recipe" className="text-blue-600 font-medium hover:underline">
        Lihat Halaman Tambah Resep
      </Link>
    </div>
  );
}
