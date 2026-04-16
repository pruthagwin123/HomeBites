function ChefProfileCard({ chef, compact = false }) {
  return (
    <article className={`hb-surface hb-hover-lift rounded-2xl border border-orange-100 bg-white p-4 sm:p-5 ${compact ? '' : 'space-y-3'}`} data-reveal="enter">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-emerald-700">{chef.hygieneBadge}</p>
          <h3 className="text-lg font-bold text-slate-900">{chef.kitchenName}</h3>
          <p className="text-sm text-slate-600">{chef.name}</p>
        </div>
        <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">{chef.distanceKm} km</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-700">{chef.rating.toFixed(1)} / 5 rating</p>
        <p className="text-xs text-slate-500">{chef.city}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {chef.specialties.map((item) => (
          <span key={item} className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}

export default ChefProfileCard;
