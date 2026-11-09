'use client';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '@/shared/lib/axiosClient';
import { getComments, postComment } from '../api/recipeDetailApi';

export const NAME_MAX = 30;
export const TEXT_MAX = 500;

export function validateComment({ user, text }) {
  const errors = {};
  const name = user.trim();
  const body = text.trim();
  if (!name) errors.user = 'Nama wajib diisi.';
  else if (name.length < 2) errors.user = 'Nama minimal 2 karakter.';
  else if (name.length > NAME_MAX) errors.user = `Nama maksimal ${NAME_MAX} karakter.`;

  if (!body) errors.text = 'Komentar wajib diisi.';
  else if (body.length < 3) errors.text = 'Komentar minimal 3 karakter.';
  else if (body.length > TEXT_MAX) errors.text = `Komentar maksimal ${TEXT_MAX} karakter.`;
  return errors;
}

export function useComments(recipeId) {
  const [comments, setComments] = useState([]);
  const [status, setStatus] = useState('loading');
  const [loadError, setLoadError] = useState('');
  const [attempt, setAttempt] = useState(0);

  const [form, setForm] = useState({ user: '', text: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [justPosted, setJustPosted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    getComments(recipeId, controller.signal)
      .then((data) => {
        setComments(data);
        setStatus('success');
      })
      .catch((error) => {
        if (controller.signal.aborted || axios.isCancel(error)) return;
        setLoadError(getErrorMessage(error));
        setStatus('error');
      });

    return () => controller.abort();
  }, [recipeId, attempt]);

  const reload = useCallback(() => {
    setStatus('loading');
    setLoadError('');
    setAttempt((n) => n + 1);
  }, []);

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setJustPosted(false);
  }

  async function submit(event) {
    event.preventDefault();
    const errors = validateComment(form);
    setFieldErrors(errors);
    setSubmitError('');
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);
    try {
      const created = await postComment(recipeId, {
        user: form.user.trim(),
        text: form.text.trim(),
      });
      setComments((prev) => [...prev, created]);
      setForm((prev) => ({ ...prev, text: '' }));
      setJustPosted(true);
    } catch (error) {
      setSubmitError(error.response?.status === 400
        ? error.response.data?.message || 'Komentar tidak valid.'
        : getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    comments, status, loadError, reload,
    form, fieldErrors, submitError, isSubmitting, justPosted,
    updateField, submit,
  };
}
