"use client";
import axios from 'axios';
import { useState, useRef } from 'react';

function DynamicInput({ title, items, placeholder, onChange }) {
  const handleChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  }

  const handleAddInput = () => {
    onChange([...items, '']);
  }

  return (
    <div className="mb-5">
      <label className="block font-semibold mb-1.5 text-gray-800">
        {title}
      </label>

      {items.map((value, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            required
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 outline-none transition-all text-gray-700"
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => {
                const newItems = items.filter((_, i) => i !== index);
                onChange(newItems);
              }}
              className="text-red-500 hover:text-red-700 px-2 font-bold text-xl transition-colors"
              title="Hapus baris"
            >
              &times;
            </button>
          )}

        </div>
      ))}

      <button
        type="button"
        onClick={handleAddInput}
        className="text-green-800 text-sm font-bold mt-1 hover:text-green-900 hover:underline transition-colors"
      >
        + Tambah {title}
      </button>
    </div>
  );
}

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [ingredient, setIngredient] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const fileInputRef = useRef(null);

  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('photo', image);
    formData.append('ingredients', JSON.stringify(ingredient.filter(i => i.trim() !== '')));
    formData.append('steps', JSON.stringify(steps.filter(s => s.trim() !== '')));

    setLoading(true);
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', formData);
      setMessage('Resep berhasil ditambahkan!');
      setIsSuccess(true);
    } catch (e) {
      setMessage('Gagal menyimpan resep. Silakan coba lagi.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  }

  const handleImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImg(URL.createObjectURL(file));
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 mb-12 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-800">
      <a
        href="/"
        className="inline-flex items-center justify-center w-10 h-10 mr-4 border border-green-800 rounded-xl hover:bg-green-800 hover:text-white text-green-800 transition-colors"
        title="Kembali"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h17" />
        </svg>
      </a>
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800 pb-4">
        Tambah Resep
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block font-semibold mb-1.5 text-gray-800">Judul</label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 outline-none transition-all text-gray-700"
            placeholder="Contoh: Nasi Goreng Spesial"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1.5 text-gray-800">Deskripsi</label>
          <textarea
            id="description"
            required
            rows="4"
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-green-800 focus:border-green-800 outline-none transition-all text-gray-700 resize-y"
            placeholder="Deskripsikan resep ini..."
          ></textarea>
        </div>

        <DynamicInput
          title="Bahan-bahan"
          items={ingredient}
          placeholder="Bahan"
          onChange={setIngredient}
        />

        <DynamicInput
          title="Langkah-langkah"
          items={steps}
          placeholder="Langkah"
          onChange={setSteps}
        />

        <div>
          <label htmlFor="photo" className="block font-semibold mb-1.5 text-gray-800">Upload Foto Makanan</label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImg}
            ref={fileInputRef}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-md cursor-pointer file:cursor-pointer file:mr-4 file:py-2.5 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-800 hover:file:bg-green-100 transition-all"
          />

          {previewImg && (
            <div className="mt-4">
              <span className="block text-sm text-gray-500 mb-2">Pratinjau Foto:</span>
              <img
                src={previewImg}
                alt="Preview Foto Resep"
                className="max-h-64 w-full object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-800 text-white p-3.5 rounded-md font-bold text-lg hover:bg-green-900 transition-colors mt-8 shadow-md disabled:opacity-70 disabled:cursor-wait"
        >
          {isLoading ? 'Menambahkan Resep...' : 'Simpan Resep'}
        </button>

        {message !== '' && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center transform transition-all">
              <h2 className={`text-2xl font-bold mb-3 ${isSuccess ? 'text-green-800' : 'text-red-700'}`}>
                {isSuccess ? 'Berhasil!' : 'Terjadi Kesalahan!'}
              </h2>

              <p className="mb-8 text-gray-600 leading-relaxed">{message}</p>

              <button
                type="button"
                onClick={() => {
                  setMessage('');
                  if (isSuccess) {
                    setTitle('');
                    setDesc('');
                    setIngredient(['']);
                    setSteps(['']);
                    setImage(null);
                    setPreviewImg('');

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }
                }}
                className="bg-green-800 text-white px-6 py-2.5 rounded-md font-bold hover:bg-green-900 transition-colors w-full shadow-sm"
              >
                {isSuccess ? "Tutup" : "Kembali"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}