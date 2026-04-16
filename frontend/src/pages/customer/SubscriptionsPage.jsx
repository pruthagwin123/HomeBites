import SectionTitle from '../../components/common/SectionTitle';
import SubscriptionPlanCard from '../../components/common/SubscriptionPlanCard';
import { useAppStore } from '../../app/store/useAppStore';

const curatedPlans = [
  {
    planName: 'Weekly Family Comfort Box',
    period: 'weekly',
    mealsPerWeek: 6,
    chefId: 'chef-1',
    chefName: 'Chef Meera Nair',
    amount: 1799
  },
  {
    planName: 'Weekly Lean Protein Meal Pack',
    period: 'weekly',
    mealsPerWeek: 7,
    chefId: 'chef-4',
    chefName: 'Chef Sana Iqbal',
    amount: 2099
  },
  {
    planName: 'Monthly Wellness Lunch',
    period: 'monthly',
    mealsPerWeek: 5,
    chefId: 'chef-4',
    chefName: 'Chef Sana Iqbal',
    amount: 5999
  },
  {
    planName: 'Monthly Office Tiffin Saver',
    period: 'monthly',
    mealsPerWeek: 5,
    chefId: 'chef-3',
    chefName: 'Chef Kavya Rao',
    amount: 5299
  }
];

function SubscriptionsPage() {
  const subscriptions = useAppStore((state) => state.getSubscriptions());
  const createSubscription = useAppStore((state) => state.createSubscription);

  return (
    <main className="space-y-6">
      <SectionTitle
        eyebrow="Subscriptions"
        title="Weekly and monthly meal plans"
        subtitle="Set your routine once and get fresh meals delivered on schedule."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {curatedPlans.map((plan) => (
          <SubscriptionPlanCard key={`${plan.planName}-${plan.period}`} plan={plan} onActivate={createSubscription} />
        ))}
      </section>

      <section className="rounded-2xl border border-emerald-100 bg-white p-4">
        <h3 className="text-lg font-bold text-slate-900">Active subscriptions</h3>
        <div className="mt-3 space-y-2">
          {subscriptions.map((sub) => (
            <article key={sub.id} className="rounded-xl border border-orange-100 bg-orange-50/50 p-3">
              <p className="text-sm font-semibold text-slate-900">{sub.planName}</p>
              <p className="text-xs text-slate-600">
                {sub.period} plan · {sub.mealsPerWeek} meals/week · by {sub.chefName}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SubscriptionsPage;
