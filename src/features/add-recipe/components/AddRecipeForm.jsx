'use client';
import Link from 'next/link';
import { DynamicInput } from './DynamicInput';
import { useAddRecipe } from '../hooks/useAddRecipe';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { StatusModal } from '@/shared/ui/StatusModal';

export function AddRecipeForm() {
  const {
    title,
    setTitle,
    category,
    setCategory,
    desc,
    setDesc,
    ingredient,
    setIngredient,
    steps,
    setSteps,
    previewImg,
    fileInputKey,
    categories,
    isLoadingCategories,
    categoryError,
    errors,
    isLoading,
    message,
    isSuccess,
    loadCategories,
    handleImg,
    handleSubmit,
    submitRecipe,
    closeModal,
  } = useAddRecipe();

  return (
    <section
      aria-labelledby="add-recipe-heading"
      className="mx-auto mt-10 mb-12 max-w-2xl rounded-xl border border-gray-100 bg-white p-8 text-gray-800 shadow-lg"
    >
      <header className="mb-6">
        <Link
          href="/"
          aria-label="Kembali ke Beranda"
          title="Kembali"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-green-800 text-green-800 transition-colors hover:bg-green-800 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h17" />
          </svg>
        </Link>

        <h1 id="add-recipe-heading" className="pb-2 text-center text-3xl font-bold text-green-800">
          Tambah Resep
        </h1>
      </header>

      <ErrorAlert message={categoryError} onRetry={loadCategories} />

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-1.5 block font-semibold text-gray-800">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            className={`w-full rounded-md border p-2.5 text-gray-700 outline-none transition-all focus:ring-2 ${
              errors.title
                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                : 'border-gray-300 focus:border-green-800 focus:ring-green-800'
            }`}
            placeholder="Contoh: Nasi Goreng Spesial"
          />
          {errors.title && (
            <p id="title-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="mb-1.5 block font-semibold text-gray-800">
            Kategori Masakan <span className="text-red-500">*</span>
          </label>

          {isLoadingCategories ? (
            <div
              role="status"
              aria-label="Memuat daftar kategori"
              className="h-11 w-full animate-pulse rounded-md bg-gray-200"
            />
          ) : (
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={categories.length === 0}
              className="w-full rounded-md border border-gray-300 bg-white p-2.5 text-gray-700 outline-none transition-all focus:border-green-800 focus:ring-2 focus:ring-green-800 disabled:bg-gray-100"
            >
              {categories.length === 0 ? (
                <option value="">Kategori tidak tersedia</option>
              ) : (
                categories.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))
              )}
            </select>
          )}

          {errors.category && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block font-semibold text-gray-800">
            Deskripsi <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            aria-invalid={Boolean(errors.desc)}
            aria-describedby={errors.desc ? 'desc-error' : undefined}
            className={`w-full resize-y rounded-md border p-2.5 text-gray-700 outline-none transition-all focus:ring-2 ${
              errors.desc
                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                : 'border-gray-300 focus:border-green-800 focus:ring-green-800'
            }`}
            placeholder="Deskripsikan resep ini..."
          />
          {errors.desc && (
            <p id="desc-error" role="alert" className="mt-1 text-xs font-medium text-red-600">
              {errors.desc}
            </p>
          )}
        </div>

        <DynamicInput
          title="Bahan-bahan"
          items={ingredient}
          placeholder="Bahan"
          error={errors.ingredient}
          onChange={setIngredient}
        />

        <DynamicInput
          title="Langkah-langkah"
          items={steps}
          placeholder="Langkah"
          error={errors.steps}
          onChange={setSteps}
        />

        <div>
          <label htmlFor="photo" className="mb-1.5 block font-semibold text-gray-800">
            Upload Foto Makanan <span className="text-xs font-normal text-gray-500">(Maks. 2MB)</span>
          </label>
          <input
            key={fileInputKey}
            type="file"
            id="photo"
            accept="image/*"
            onChange={handleImg}
            className="block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-600 transition-all file:mr-4 file:cursor-pointer file:border-0 file:bg-green-50 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-green-800 hover:file:bg-green-100"
          />

          {errors.photo && (
            <p role="alert" className="mt-1 text-xs font-medium text-red-600">
              {errors.photo}
            </p>
          )}

          {previewImg && (
            <div className="mt-4">
              <span className="mb-2 block text-sm text-gray-500">Pratinjau Foto:</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImg}
                alt="Preview Foto Resep"
                className="max-h-64 w-full rounded-lg border border-gray-200 object-cover shadow-sm"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 w-full rounded-md bg-green-800 p-3.5 text-lg font-bold text-white shadow-md transition-colors hover:bg-green-900 disabled:cursor-wait disabled:opacity-70"
        >
          {isLoading ? 'Menambahkan Resep...' : 'Simpan Resep'}
        </button>

        <StatusModal
          isOpen={message !== ''}
          isSuccess={isSuccess}
          message={message}
          onClose={closeModal}
          onRetry={submitRecipe}
        />
      </form>
    </section>
  );
}
