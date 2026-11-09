'use client';
import { useState } from 'react';

export function IngredientList({ ingredients }) {
  const [checked, setChecked] = useState(() => new Set());
  const done = checked.size;

  function toggle(index) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <section aria-labelledby="bahan-heading" className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="bahan-heading" className="font-serif text-2xl font-bold text-[#234332]">Bahan-bahan</h2>
        <p aria-live="polite" className="text-xs font-medium text-green-800">{done}/{ingredients.length} siap</p>
      </div>
      <div
        role="progressbar"
        aria-label="Bahan yang sudah disiapkan"
        aria-valuemin={0}
        aria-valuemax={ingredients.length}
        aria-valuenow={done}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-green-100"
      >
        <div className="h-full rounded-full bg-green-700 transition-all" style={{ width: `${(done / ingredients.length) * 100}%` }} />
      </div>

      <ul className="mt-4 space-y-1">
        {ingredients.map((item, index) => {
          const id = `bahan-${index}`;
          return (
            <li key={id}>
              <label htmlFor={id} className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 hover:bg-green-50 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-green-700">
                <input
                  id={id}
                  type="checkbox"
                  checked={checked.has(index)}
                  onChange={() => toggle(index)}
                  className="mt-1 size-4 shrink-0 accent-green-800"
                />
                <span className={checked.has(index) ? 'text-stone-400 line-through' : 'text-stone-800'}>{item}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
