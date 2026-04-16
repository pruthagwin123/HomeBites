function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="space-y-2" data-reveal="enter">
      {eyebrow ? <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-emerald-700">{eyebrow}</p> : null}
      <h2 className="text-[1.65rem] font-bold leading-tight text-slate-900 sm:text-[2rem]">{title}</h2>
      {subtitle ? <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p> : null}
    </div>
  );
}

export default SectionTitle;
