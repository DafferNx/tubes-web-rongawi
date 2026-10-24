"use client";

import { useState } from 'react';

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('ingredients', JSON.stringify(ingredients.filter(i => i.trim() !== '')));
    formData.append('steps', JSON.stringify(steps.filter(s => s.trim() !== '')));
    
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Resep berhasil disimpan!');
        setTitle('');
        setDescription('');
        setIngredients(['']);
        setSteps(['']);
        setImage(null);
      } else {
        alert('Gagal menyimpan resep. Pastikan API sudah siap.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert('Terjadi kesalahan saat mengirim data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md text-black">
      <h1 className="text-2xl font-bold mb-6">Tambah Resep Baru</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Judul Resep</label>
          <input 
            type="text" 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Contoh: Nasi Goreng Spesial"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Deskripsi Singkat</label>
          <textarea 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded h-24"
            placeholder="Deskripsikan resep ini..."
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Bahan-bahan</label>
          {ingredients.map((ingredient, index) => (
            <input 
              key={index}
              type="text" 
              required
              value={ingredient} 
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-2"
              placeholder={`Bahan ${index + 1}`}
            />
          ))}
          <button 
            type="button" 
            onClick={() => setIngredients([...ingredients, ''])} 
            className="text-blue-600 text-sm font-bold mt-1"
          >
            + Tambah Bahan
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">Langkah-langkah</label>
          {steps.map((step, index) => (
            <textarea 
              key={index}
              required
              value={step} 
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-2 h-16"
              placeholder={`Langkah ${index + 1}`}
            />
          ))}
          <button 
            type="button" 
            onClick={() => setSteps([...steps, ''])} 
            className="text-blue-600 text-sm font-bold mt-1"
          >
            + Tambah Langkah
          </button>
        </div>

        <div>
          <label className="block font-semibold mb-1">Upload Foto Makanan</label>
          <input 
            type="file" 
            required
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 disabled:bg-gray-400 mt-4"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan / Publikasikan Resep'}
        </button>
      </form>
    </div>
  );
}