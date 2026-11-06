"use client";
import axios from 'axios';

import { useState } from 'react';

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
    <div className="mb-4">
      <label htmlFor="inputTitle"
        className="block font-semibold mb-1"
      >{title}</label>

      {items.map((value, index) => (
        <input
          key={index}
          type="text"
          required
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          placeholder={`${placeholder} ${index + 1}`}
          className="w-full border border-gray-300 p-2 rounded mb-2"
        />
      ))}

      <button
        type="button"
        onClick={handleAddInput}
        className="text-green-800 text-sm font-bold mt-1"
      >+ Tambah {title}</button>

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
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6">Tambah Resep</h1>
      <form action="" onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block font-semibold mb-1">Judul</label>
          <input type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Contoh: Nasi Goreng Spesial"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-semibold mb-1">Deskripsi</label>
          <textarea
            required
            value={desc}
            onChange={e => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
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
          <label htmlFor="photo" className="block font-semibold mb-1">Upload Foto Makanan</label>
          <input type="file"
            accept='image/*'
            className="w-full border border-gray-300 p-2 rounded"
            onChange={handleImg}
          />

          {previewImg &&
            (
              <img src={previewImg} alt="Preview Foto Resep"
                className="mt-3 max-h-48 w-full object-cover rounded border border-gray-300" />
            )
          }
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-800 text-white p-3 rounded font-bold hover:bg-blue-700 mt-4"
        >
          {isLoading ? 'Menambahkan Resep...' : 'Tambah Resep'}
        </button>

        {message !== '' && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">

              {/* Judul Pop-up dinamis warnanya berdasarkan state isSuccess */}
              <h2 className={`text-xl font-bold mb-2 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                {isSuccess ? 'Berhasil!' : 'Terjadi Kesalahan'}
              </h2>

              <p className="mb-6">{message}</p>

              {/* Tombol untuk menutup pop-up dengan cara mengosongkan state message */}
              <button
                onClick={() => {
                  setMessage('');
                  if (isSuccess) {
                    setTitle('');
                    setDesc('');
                    setIngredient(['']);
                    setSteps(['']);
                    setImage(null);
                    setPreviewImg('');
                  }
                }}
                className="bg-gray-800 text-white px-4 py-2 rounded font-bold hover:bg-gray-700 w-full"
              >
                Tutup
              </button>

            </div>
          </div>
        )}
      </form>
    </div>
  );
}