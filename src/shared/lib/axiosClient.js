import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pesan Error
export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return 'Waktu koneksi habis (timeout). Periksa koneksi internet Anda lalu coba lagi.';
    }
    if (!error.response) {
      return 'Tidak dapat terhubung ke server. Pastikan koneksi internet Anda aktif.';
    }
    const status = error.response.status;
    if (status === 400) {
      return 'Data resep yang dikirim tidak valid. Mohon periksa kembali isian form Anda.';
    }
    if (status === 404) {
      return 'Endpoint atau data API tidak ditemukan (Error 404).';
    }
    if (status >= 500) {
      return 'Terjadi gangguan pada server (Error 500). Silakan coba beberapa saat lagi.';
    }
    return error.response.data?.message || `Gagal memproses permintaan (Status: ${status}).`;
  }

  return error?.message || 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.';
}
