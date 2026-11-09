import { NextResponse } from 'next/server';

const MOCK_USERS = [
  { id: 1, name: 'User Demo', email: 'user@gmail.com', password: 'user123' },
  { id: 2, name: 'Eve Holt', email: 'eve.holt@reqres.in', password: 'cityslicka' },
  { id: 3, name: 'Admin Resep', email: 'admin@ruangresep.id', password: 'admin123' },
];

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email dan password wajib diisi.' }, { status: 400 });
  }

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: 'Email atau password salah.' }, { status: 401 });
  }

  return NextResponse.json({
    token: `mock-token-${user.id}-${Date.now()}`,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
