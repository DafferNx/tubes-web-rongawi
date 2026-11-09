import { getMockComments, postMockComment } from '@/features/recipe-detail/server';

export async function GET(_request, { params }) {
  const { id } = await params;
  return getMockComments(id);
}

export async function POST(request, { params }) {
  const { id } = await params;
  return postMockComment(id, request);
}
