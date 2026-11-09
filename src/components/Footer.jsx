export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 text-stone-600 max-lg:pb-24">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Identitas Brand & Deskripsi Singkat */}
          <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:text-left">
            <div className="inline-flex items-center gap-2 text-base font-bold text-green-950">
              <span
                aria-hidden="true"
                className="grid size-7 place-items-center rounded-lg bg-green-800 font-serif text-base font-normal text-white"
              >
                R
              </span>
              <span>
                Ruang Resep<span className="text-green-600">.</span>
              </span>
            </div>
            <p className="max-w-md text-xs text-stone-500">
              Wadah berbagi kreasi masakan rumahan sehari-hari dari dan untuk keluarga di seluruh Indonesia.
            </p>
          </div>

          {/* Informasi Hak Cipta & Catatan Komunitas (Tidak menduplikasi link navigasi) */}
          <div className="flex flex-col items-center gap-1 text-center text-xs text-stone-500 sm:items-end sm:text-right">
            <p className="font-medium text-stone-700">
              Dibuat dengan penuh rasa untuk para pencinta masakan rumah.
            </p>
            <p suppressHydrationWarning className="text-[11px] text-stone-400">
              &copy; {new Date().getFullYear()} Ruang Resep. Hak cipta dilindungi.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

