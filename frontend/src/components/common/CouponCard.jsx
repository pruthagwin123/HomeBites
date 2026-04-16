function CouponCard({ coupon, onApply }) {
  const palette = {
    orange: 'from-orange-50 to-amber-50 border-orange-200',
    green: 'from-emerald-50 to-teal-50 border-emerald-200',
    cream: 'from-amber-50 to-orange-50 border-amber-200'
  };

  return (
    <article className={`hb-surface hb-hover-lift rounded-2xl border bg-gradient-to-r p-4 sm:p-5 ${palette[coupon.accent] || palette.orange}`} data-reveal="enter">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Promo</p>
          <h3 className="text-base font-bold text-slate-900">{coupon.title}</h3>
          <p className="mt-1 text-xs text-slate-600">Min order {coupon.minOrder}</p>
        </div>
        <button
          onClick={() => onApply(coupon.code)}
          className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
        >
          Apply {coupon.code}
        </button>
      </div>
    </article>
  );
}

export default CouponCard;
