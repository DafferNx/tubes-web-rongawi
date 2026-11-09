'use client';
import { useEffect } from 'react';

export function StatusModal({ isOpen, isSuccess, title, message, onClose, onRetry }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="status-modal-title"
      aria-describedby="status-modal-desc"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl transition-all">
        <h2
          id="status-modal-title"
          className={`mb-3 text-2xl font-bold ${isSuccess ? 'text-green-800' : 'text-red-700'}`}
        >
          {title || (isSuccess ? 'Berhasil!' : 'Terjadi Kesalahan!')}
        </h2>

        <p id="status-modal-desc" className="mb-8 leading-relaxed text-gray-600">
          {message}
        </p>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          {!isSuccess && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="w-full rounded-md border border-green-800 bg-white px-5 py-2.5 font-bold text-green-800 shadow-sm transition-colors hover:bg-green-50"
            >
              Coba Lagi
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-green-800 px-6 py-2.5 font-bold text-white shadow-sm transition-colors hover:bg-green-900"
          >
            {isSuccess ? 'Tutup' : 'Kembali'}
          </button>
        </div>
      </div>
    </div>
  );
}
