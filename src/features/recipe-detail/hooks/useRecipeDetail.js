'use client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '@/shared/lib/axiosClient';
import { getRecipeById } from '../api/recipeDetailApi';

// state: { status: 'loading' | 'success' | 'error', recipe, error, notFound }
export function useRecipeDetail(id) {
  const [state, setState] = useState({ status: 'loading', recipe: null, error: '', notFound: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getRecipeById(id, controller.signal)
      .then((recipe) => setState({ status: 'success', recipe, error: '', notFound: false }))
      .catch((error) => {
        if (controller.signal.aborted || axios.isCancel(error)) return;
        const status = error.response?.status;
        setState({
          status: 'error',
          recipe: null,
          notFound: status === 404 || status === 400,
          error: status === 404 || status === 400
            ? 'Resep yang kamu cari tidak ada atau sudah dihapus.'
            : getErrorMessage(error),
        });
      });

    return () => controller.abort();
  }, [id, attempt]);

  const retry = useCallback(() => {
    setState({ status: 'loading', recipe: null, error: '', notFound: false });
    setAttempt((n) => n + 1);
  }, []);

  return { ...state, retry };
}
