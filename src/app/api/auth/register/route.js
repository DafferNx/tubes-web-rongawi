import { NextResponse } from 'next/server';

const EXISTING_EMAILS = new Set([
  'user@gmail.com',
  'eve.holt@reqres.in',
  'admin@ruangresep.id',
]);

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Semua field wajib diisi.' }, { status: 400 });
  }

  if (EXISTING_EMAILS.has(email)) {
    return NextResponse.json({ error: 'Email sudah terdaftar. Gunakan email lain.' }, { status: 409 });
  }

  return NextResponse.json({
    token: `mock-token-new-${Date.now()}`,
    id: Date.now(),
    user: { name, email },
  });
}
