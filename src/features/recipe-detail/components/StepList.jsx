export function StepList({ steps }) {
  return (
    <section aria-labelledby="langkah-heading">
      <h2 id="langkah-heading" className="font-serif text-2xl font-bold text-[#234332]">Langkah Memasak</h2>
      <ol className="mt-5 space-y-4">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-4 rounded-2xl border border-green-100 bg-white p-4 shadow-sm sm:p-5">
            <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-green-800 font-serif text-lg font-bold text-white">
              {index + 1}
            </span>
            <p className="pt-1.5 leading-relaxed text-stone-800">
              <span className="sr-only">Langkah {index + 1}: </span>
              {step}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
