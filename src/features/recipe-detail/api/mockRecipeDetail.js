// Mock API sisi server (dipanggil dari route handler Next.js).
import recipes from '@/features/search/data/recipes.json' with { type: 'json' };
import details from '../data/recipe-details.json' with { type: 'json' };
import seedComments from '../data/recipe-comments.json' with { type: 'json' };

const NAME_MAX = 30;
const TEXT_MAX = 500;

// Penyimpanan komentar sementara di memori server (reset saat server restart).
const store = (globalThis.__recipeComments ??= structuredClone(seedComments));

function parseId(rawId) {
  return /^\d+$/.test(rawId) ? rawId : null;
}

function badRequest(message) {
  return Response.json({ message }, { status: 400 });
}

function notFound() {
  return Response.json({ message: 'Resep tidak ditemukan.' }, { status: 404 });
}

export function getMockRecipe(rawId) {
  const id = parseId(rawId);
  if (!id) return badRequest('ID resep tidak valid.');

  const base = recipes.find((recipe) => String(recipe.id) === id);
  const detail = details[id];
  if (!base || !detail) return notFound();

  return Response.json({ recipe: { ...base, ...detail } });
}

export function getMockComments(rawId) {
  const id = parseId(rawId);
  if (!id) return badRequest('ID resep tidak valid.');
  if (!details[id]) return notFound();

  return Response.json({ comments: store[id] ?? [] });
}

export async function postMockComment(rawId, request) {
  const id = parseId(rawId);
  if (!id) return badRequest('ID resep tidak valid.');
  if (!details[id]) return notFound();

  let body;
  try {
    body = await request.json();
  } catch {
    return badRequest('Format data komentar tidak valid.');
  }

  const user = String(body?.user ?? '').trim();
  const text = String(body?.text ?? '').trim();
  if (user.length < 2 || user.length > NAME_MAX) {
    return badRequest(`Nama harus 2–${NAME_MAX} karakter.`);
  }
  if (text.length < 3 || text.length > TEXT_MAX) {
    return badRequest(`Komentar harus 3–${TEXT_MAX} karakter.`);
  }

  const comment = {
    id: `c-${Date.now()}`,
    user,
    text,
    createdAt: new Date().toISOString(),
  };
  store[id] = [...(store[id] ?? []), comment];
  return Response.json({ comment }, { status: 201 });
}
