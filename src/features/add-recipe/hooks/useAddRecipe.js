'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCategories, saveRecipe } from '../api/addRecipeApi';
import { getErrorMessage } from '@/shared/lib/axiosClient';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // Max 2MB

export function useAddRecipe() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [ingredient, setIngredient] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const [image, setImage] = useState(null);
  const [previewImg, setPreviewImg] = useState('');
  const [fileInputKey, setFileInputKey] = useState(0);

  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);

  // Load ulang kategori jika gagal
  const loadCategories = useCallback(async () => {
    setIsLoadingCategories(true);
    setCategoryError('');
    try {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setCategory((current) => current || data[0].name);
      }
    } catch (error) {
      setCategoryError(getErrorMessage(error));
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  // Ambil data kategori 
  useEffect(() => {
    let isActive = true;
    getCategories()
      .then((data) => {
        if (!isActive) return;
        setCategories(data);
        if (data.length > 0) {
          setCategory((current) => current || data[0].name);
        }
      })
      .catch((error) => {
        if (!isActive) return;
        setCategoryError(getErrorMessage(error));
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoadingCategories(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  // Validasi input form
  const validateForm = () => {
    const newErrors = {};
    const validIngredients = ingredient.map((item) => item.trim()).filter(Boolean);
    const validSteps = steps.map((item) => item.trim()).filter(Boolean);

    if (!title.trim()) {
      newErrors.title = 'Judul resep wajib diisi.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'Judul resep minimal 3 karakter.';
    }

    if (!category.trim()) {
      newErrors.category = 'Silakan pilih kategori resep.';
    }

    if (!desc.trim()) {
      newErrors.desc = 'Deskripsi resep wajib diisi.';
    } else if (desc.trim().length < 10) {
      newErrors.desc = 'Deskripsi terlalu singkat (minimal 10 karakter).';
    }

    if (validIngredients.length === 0) {
      newErrors.ingredient = 'Minimal 1 bahan masakan harus diisi dengan benar.';
    }

    if (validSteps.length === 0) {
      newErrors.steps = 'Minimal 1 langkah memasak harus diisi dengan benar.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validasi dan preview foto
  const handleImg = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Format file harus berupa gambar (JPG, PNG, atau WEBP).',
      }));
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        photo: 'Ukuran foto terlalu besar. Maksimal 2MB.',
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, photo: undefined }));
    setImage(file);
    setPreviewImg(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setTitle('');
    setDesc('');
    setIngredient(['']);
    setSteps(['']);
    setImage(null);
    setPreviewImg('');
    setErrors({});
    setFileInputKey((prev) => prev + 1);
    if (categories.length > 0) {
      setCategory(categories[0].name);
    }
  };

  // Kirim data resep ke API
  const submitRecipe = async () => {
    if (!validateForm()) return;

    const recipeData = {
      title: title.trim(),
      category,
      description: desc.trim(),
      ingredients: ingredient.map((item) => item.trim()).filter(Boolean),
      steps: steps.map((item) => item.trim()).filter(Boolean),
      photoName: image ? image.name : null,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    try {
      await saveRecipe(recipeData);
      setMessage('Resep berhasil ditambahkan!');
      setIsSuccess(true);
    } catch (error) {
      setMessage(getErrorMessage(error));
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitRecipe();
  };

  const closeModal = () => {
    setMessage('');
    if (isSuccess) {
      resetForm();
    }
  };

  return {
    title,
    setTitle,
    category,
    setCategory,
    desc,
    setDesc,
    ingredient,
    setIngredient,
    steps,
    setSteps,
    previewImg,
    fileInputKey,
    categories,
    isLoadingCategories,
    categoryError,
    errors,
    isLoading,
    message,
    isSuccess,
    loadCategories,
    handleImg,
    handleSubmit,
    submitRecipe,
    closeModal,
  };
}
