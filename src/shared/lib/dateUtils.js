/**
 * Mengubah ISO date string atau teks waktu menjadi format relatif dalam Bahasa Indonesia.
 * Contoh output: "diposting 2 jam yang lalu", "diposting 15 menit yang lalu", "diposting 30 detik yang lalu"
 */
export function formatRelativeTime(dateInput) {
  if (!dateInput) return '';

  // Jika input sudah berupa teks relatif (misal "2 jam yang lalu")
  if (typeof dateInput === 'string' && dateInput.includes('yang lalu')) {
    return dateInput.startsWith('diposting') ? dateInput : `diposting ${dateInput}`;
  }

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) {
    return `diposting ${dateInput}`;
  }

  const now = new Date();
  let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Jika waktu berada di masa depan karena perbedaan jam sistem
  if (diffInSeconds < 0) {
    diffInSeconds = Math.abs(diffInSeconds) % 86400;
  }

  if (diffInSeconds < 60) {
    const sec = Math.max(1, diffInSeconds);
    return `diposting ${sec} detik yang lalu`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `diposting ${diffInMinutes} menit yang lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `diposting ${diffInHours} jam yang lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `diposting ${diffInDays} hari yang lalu`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `diposting ${diffInWeeks} minggu yang lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `diposting ${diffInMonths} bulan yang lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `diposting ${diffInYears} tahun yang lalu`;
}

