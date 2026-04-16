import { formatCurrency } from '../../utils/formatCurrency';

function SubscriptionPlanCard({ plan, onActivate }) {
  return (
    <article className="hb-surface hb-hover-lift rounded-2xl border border-orange-100 bg-white p-4 sm:p-5" data-reveal="enter">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">{plan.period} Plan</p>
      <h3 className="mt-1 text-lg font-bold text-slate-900">{plan.planName}</h3>
      <p className="text-sm text-slate-600">By {plan.chefName}</p>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-slate-600">{plan.mealsPerWeek} meals/week</p>
        <p className="text-lg font-black text-emerald-700">{formatCurrency(plan.amount)}</p>
      </div>
      <button
        className="mt-3 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        onClick={() => onActivate?.(plan)}
      >
        Activate Plan
      </button>
    </article>
  );
}

export default SubscriptionPlanCard;
