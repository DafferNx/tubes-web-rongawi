export default function StarRating({ rating = 5, comments = 0 }) {
  const fullStars = Math.floor(rating);
  return (
    <div
      role="img"
      aria-label={`Rating ${rating.toLocaleString('id-ID')} dari 5 bintang${comments > 0 ? `, ${comments} ulasan` : ''}`}
      className="flex items-center gap-1 text-amber-500"
    >
      <div className="flex text-xs tracking-tighter" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star}>{star <= fullStars ? '★' : '☆'}</span>
        ))}
      </div>
      {comments > 0 && (
        <span className="text-[11px] font-medium text-stone-500">({comments})</span>
      )}
    </div>
  );
}

