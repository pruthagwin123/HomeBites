function StatTile({ label, value, tone = 'orange' }) {
  const tones = {
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
    green: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    cream: 'bg-amber-50 border-amber-200 text-amber-700'
  };

  return (
    <article className={`hb-surface hb-hover-lift rounded-2xl border p-4 sm:p-5 ${tones[tone]}`} data-reveal="enter">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em]">{label}</p>
      <p className="mt-2 text-2xl font-black leading-tight text-slate-900 sm:text-[1.85rem]">{value}</p>
    </article>
  );
}

export default StatTile;
