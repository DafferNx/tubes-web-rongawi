import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/shared/lib/axiosClient';
import { searchRecipes } from '../api/searchRecipes';

export function useRecipeSearch() {
  const [filters, setFilters] = useState({ keyword: '', category: '' });
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const recipes = await searchRecipes(
          { keyword: filters.keyword.trim(), category: filters.category },
          controller.signal
        );
        if (!controller.signal.aborted) setResult({ recipes });
      } catch (error) {
        if (controller.signal.aborted) return;
        const message = error.response?.status === 400
          ? 'Kata kunci atau kategori tidak valid.'
          : getErrorMessage(error);
        setResult({ message });
      }
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [filters]);

  function updateFilters(nextFilters) {
    setResult(null);
    setFilters(nextFilters);
  }

  return { filters, result, updateFilters };
}
