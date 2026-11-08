'use client';

export function DynamicInput({ title, items, placeholder, error, onChange }) {
  const handleChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddInput = () => {
    onChange([...items, '']);
  };

  const handleRemoveInput = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <fieldset className="mb-5">
      <legend className="mb-1.5 block font-semibold text-gray-800">
        {title} <span className="text-red-500">*</span>
      </legend>

      {items.map((value, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <input
            type="text"
            aria-label={`${placeholder} ${index + 1}`}
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`${placeholder} ${index + 1}`}
            className={`w-full rounded-md border p-2.5 text-gray-700 outline-none transition-all focus:ring-2 ${
              error
                ? 'border-red-400 focus:border-red-600 focus:ring-red-200'
                : 'border-gray-300 focus:border-green-800 focus:ring-green-800'
            }`}
          />

          {items.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveInput(index)}
              className="px-2 text-xl font-bold text-red-500 transition-colors hover:text-red-700"
              title={`Hapus ${placeholder} ${index + 1}`}
              aria-label={`Hapus ${placeholder} ${index + 1}`}
            >
              &times;
            </button>
          )}
        </div>
      ))}

      {error && (
        <p role="alert" className="mb-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleAddInput}
        className="mt-1 text-sm font-bold text-green-800 transition-colors hover:text-green-900 hover:underline"
      >
        + Tambah {title}
      </button>
    </fieldset>
  );
}
