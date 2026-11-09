'use client';
import { useComments, NAME_MAX, TEXT_MAX } from '../hooks/useComments';
import { ErrorAlert } from '@/shared/ui/ErrorAlert';
import { Skeleton } from '@/shared/ui/SearchPrimitives';

const dateFormat = new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

function CommentItem({ comment }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-green-100 bg-white p-4">
      <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-green-100 font-semibold text-green-900">
        {comment.user.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-baseline gap-x-2">
          <span className="font-semibold text-green-950">{comment.user}</span>
          <time dateTime={comment.createdAt} className="text-xs text-stone-500">
            {dateFormat.format(new Date(comment.createdAt))}
          </time>
        </p>
        <p className="mt-1 break-words text-stone-700">{comment.text}</p>
      </div>
    </li>
  );
}

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-green-950">{label}</label>
      {children}
      <div className="mt-1 flex justify-between gap-2 text-xs">
        <p id={`${id}-error`} className="text-red-700">{error}</p>
        {hint && <p className="shrink-0 text-stone-500">{hint}</p>}
      </div>
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-3.5 py-2.5 text-stone-900 outline-none transition-colors focus:ring-2 ${
    hasError ? 'border-red-400 focus:ring-red-300' : 'border-green-200 focus:border-green-600 focus:ring-green-300'
  }`;

export function CommentSection({ recipeId }) {
  const {
    comments, status, loadError, reload,
    form, fieldErrors, submitError, isSubmitting, justPosted,
    updateField, submit,
  } = useComments(recipeId);

  return (
    <section aria-labelledby="komentar-heading" className="mt-14 border-t border-green-100 pt-10">
      <h2 id="komentar-heading" className="font-serif text-2xl font-bold text-[#234332]">
        Komentar {status === 'success' && <span className="text-green-700">({comments.length})</span>}
      </h2>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div aria-live="polite">
          {status === 'loading' && (
            <div role="status" className="space-y-3">
              <span className="sr-only">Memuat komentar…</span>
              <Skeleton className="h-20" />
              <Skeleton className="h-20" />
            </div>
          )}
          {status === 'error' && <ErrorAlert message={loadError} onRetry={reload} />}
          {status === 'success' && comments.length === 0 && (
            <p className="rounded-2xl border border-dashed border-green-200 p-6 text-center text-stone-500">
              Belum ada komentar. Jadilah yang pertama!
            </p>
          )}
          {status === 'success' && comments.length > 0 && (
            <ul className="space-y-3">
              {comments.map((comment) => <CommentItem key={comment.id} comment={comment} />)}
            </ul>
          )}
        </div>

        <form onSubmit={submit} noValidate className="h-fit space-y-4 rounded-2xl border border-green-100 bg-green-50/60 p-5">
          <h3 className="font-semibold text-green-950">Tulis komentar</h3>

          <Field id="komentar-nama" label="Nama" error={fieldErrors.user}>
            <input
              id="komentar-nama"
              type="text"
              maxLength={NAME_MAX + 10}
              autoComplete="nickname"
              value={form.user}
              onChange={(e) => updateField('user', e.target.value)}
              aria-invalid={Boolean(fieldErrors.user)}
              aria-describedby="komentar-nama-error"
              className={inputClass(fieldErrors.user)}
            />
          </Field>

          <Field id="komentar-isi" label="Komentar" error={fieldErrors.text} hint={`${form.text.length}/${TEXT_MAX}`}>
            <textarea
              id="komentar-isi"
              rows={4}
              value={form.text}
              onChange={(e) => updateField('text', e.target.value)}
              placeholder="Bagikan pengalamanmu memasak resep ini…"
              aria-invalid={Boolean(fieldErrors.text)}
              aria-describedby="komentar-isi-error"
              className={inputClass(fieldErrors.text)}
            />
          </Field>

          {submitError && <ErrorAlert message={submitError} />}
          {justPosted && <p role="status" className="text-sm font-medium text-green-800">Komentar berhasil dikirim.</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-green-800 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-60"
          >
            {isSubmitting ? 'Mengirim…' : 'Kirim Komentar'}
          </button>
        </form>
      </div>
    </section>
  );
}
