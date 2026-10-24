import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-black">
      <Link href="/" className="text-blue-600 hover:underline">
        Kembali ke Beranda
      </Link>

      <h1 className="text-2xl font-bold mt-4 mb-6">Cari Resep</h1>

      <div className="space-y-4">
        <div>
          <label htmlFor="keyword" className="block font-semibold mb-1">
            Nama Resep
          </label>
          <input
            id="keyword"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Contoh: Nasi Goreng"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-semibold mb-1">
            Kategori
          </label>
          <select id="category" className="w-full border border-gray-300 p-2 rounded">
            <option>Semua Kategori</option>
            <option>Makanan Berat</option>
            <option>Dessert</option>
            <option>Minuman</option>
          </select>
        </div>

        <button type="button" className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700">
          Cari Resep
        </button>
      </div>
    </div>
  );
}
