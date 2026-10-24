"use client";

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
        className="text-blue-600 text-sm font-bold mt-1"
      >+ Tambah {title}</button>

    </div>
  );
}

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [ingredient, setIngredient] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataRecipe = {
      title,
      desc,
      ingredient: ingredient.filter(i => i.trim() !== ''),
      steps: steps.filter(s => s.trim() !== '')
    };

    console.log("Data: ", dataRecipe);

    alert('Form Submitted!');
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
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700 mt-4"
        >Submit Resep</button>

      </form>
    </div>
  );
}