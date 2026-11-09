'use client';

import { useState, useEffect, useCallback } from 'react';
import { getHomeRecipes } from '../api/homeApi';
import { getErrorMessage } from '@/shared/lib/axiosClient';

export function useHomeRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const loadRecipes = useCallback(async (signal) => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const data = await getHomeRecipes(signal);
      setRecipes(data);
    } catch (err) {
      if (signal?.aborted) return;
      setErrorMessage(getErrorMessage(err));
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadRecipes(controller.signal);
    return () => controller.abort();
  }, [loadRecipes]);

  const newRecipes = [...recipes].sort(
    (a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime()
  );

  const topRecipes = [...recipes]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10);

  return {
    recipes,
    newRecipes,
    topRecipes,
    isLoading,
    errorMessage,
    refetch: () => loadRecipes(),
  };
}

