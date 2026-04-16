import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import { getTimeGreeting } from '../../utils/greeting';
import { formatCurrency } from '../../utils/formatCurrency';
import FoodCard from '../../components/common/FoodCard';

function CustomerDashboardPage() {
  const session = useAppStore((state) => state.session);
  const foods = useAppStore((state) => state.foods);
  const orders = useAppStore((state) => state.orders.filter((item) => item.customerId === session?.id));
  const getWallet = useAppStore((state) => state.getWallet);
  const getNearbyChefs = useAppStore((state) => state.getNearbyChefs);
  const getSavedMealPlans = useAppStore((state) => state.getSavedMealPlans);
  const addToCart = useAppStore((state) => state.addToCart);

  const wallet = getWallet();
  const nearbyChefs = getNearbyChefs().slice(0, 4);
  const mealPlans = getSavedMealPlans().slice(0, 4);

  const todaysSpecials = useMemo(
    () => foods.filter((item) => item.isAvailable).slice().sort((a, b) => b.rating - a.rating).slice(0, 4),
    [foods]
  );

  const recentOrders = useMemo(
    () => orders.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6),
    [orders]
  );

  const mealMoment = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 11) {
      return { label: 'Breakfast Picks', keywords: ['rice', 'bowl', 'salad', 'noodles'] };
    }
    if (hour < 16) {
      return { label: 'Main Course Picks', keywords: ['chicken', 'paneer', 'biryani', 'masala'] };
    }
    if (hour < 20) {
      return { label: 'Evening Hunger Fix', keywords: ['noodles', 'salad', 'bowl'] };
    }
    return { label: 'Dinner Comfort Picks', keywords: ['biryani', 'chicken', 'masala'] };
  }, []);

  const mealMomentPicks = useMemo(
    () =>
      foods
        .filter((food) =>
          mealMoment.keywords.some((keyword) => food.title.toLowerCase().includes(keyword))
        )
        .slice(0, 4),
    [foods, mealMoment]
  );

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 p-6" data-reveal="enter">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-orange-200/35 blur-3xl" />
        <div className="absolute -bottom-12 left-20 h-44 w-44 rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Customer Dashboard"
            title={getTimeGreeting(session?.name || 'Friend')}
            subtitle="Your wallet, favorite chefs, today&apos;s specials, and meal plan flow are all in one handcrafted workspace."
          />
          <Link className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600" to="/customer/browse">
            Explore Meals
          </Link>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_2fr]" data-reveal="enter">
        <article className="hb-surface hb-hover-lift rounded-2xl border border-emerald-100 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">Wallet</h3>
          <p className="mt-1 text-sm text-slate-600">Track available balance and cashback rewards.</p>
          <div className="mt-4 space-y-2">
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Available Balance</p>
              <p className="text-xl font-bold text-emerald-700">{formatCurrency(wallet.balance)}</p>
            </div>
            <div className="rounded-xl bg-orange-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500">Cashback</p>
              <p className="text-xl font-bold text-orange-700">{formatCurrency(wallet.cashbackBalance)}</p>
            </div>
          </div>
          <Link className="mt-4 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800" to="/customer/wallet">
            Open wallet details
          </Link>
        </article>

        <article className="hb-surface rounded-2xl border border-orange-100 bg-white p-5">
          <div className="flex items-end justify-between gap-3">
            <h3 className="text-lg font-bold text-slate-900">Nearby Home Chefs</h3>
            <Link className="text-sm font-semibold text-orange-700 hover:text-orange-800" to="/customer/discover">
              View all
            </Link>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {nearbyChefs.map((chef) => (
              <article key={chef.id} className="hb-hover-lift rounded-xl border border-orange-100 bg-orange-50/40 p-3">
                <p className="text-sm font-bold text-slate-900">{chef.name}</p>
                <p className="text-xs text-slate-600">{chef.kitchenName}</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-emerald-100 px-2 py-1 font-semibold text-emerald-700">{chef.rating}★</span>
                  <span className="text-slate-500">{chef.distanceKm} km</span>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="space-y-3" data-reveal="enter">
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">Today&apos;s Specials</h3>
          <Link className="text-sm font-semibold text-orange-700 hover:text-orange-800" to="/customer/browse">
            See full menu
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {todaysSpecials.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="space-y-3" data-reveal="enter">
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-xl font-bold text-slate-900">{mealMoment.label}</h3>
          <Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-800" to="/customer/browse">
            Refresh menu
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {(mealMomentPicks.length ? mealMomentPicks : todaysSpecials).map((item) => (
            <FoodCard key={`moment-${item.id}`} item={item} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_1fr]" data-reveal="enter">
        <article className="hb-surface rounded-2xl border border-orange-100 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-2 py-2">Order</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Date</th>
                  <th className="px-2 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-orange-50 last:border-none">
                    <td className="px-2 py-2 font-semibold text-slate-800">{order.id}</td>
                    <td className="px-2 py-2 capitalize text-slate-600">{order.status.replaceAll('_', ' ')}</td>
                    <td className="px-2 py-2 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-2 py-2 text-right font-semibold text-slate-800">{formatCurrency(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="hb-surface rounded-2xl border border-emerald-100 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">Meal Plans</h3>
          <p className="mt-1 text-sm text-slate-600">Saved plans to keep your weekly meals consistent.</p>
          <div className="mt-3 space-y-2">
            {mealPlans.length ? (
              mealPlans.map((plan) => (
                <div key={plan.id} className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                  <p className="text-sm font-bold text-slate-900">{plan.title}</p>
                  <p className="text-xs text-slate-600">{plan.schedule}</p>
                  <p className="mt-1 text-xs text-emerald-700">{plan.targetCalories}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No saved plans yet. Create one from your subscriptions module.</p>
            )}
          </div>
          <Link className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:text-emerald-800" to="/customer/subscriptions">
            Manage meal plans
          </Link>
        </article>
      </section>
    </main>
  );
}

export default CustomerDashboardPage;
