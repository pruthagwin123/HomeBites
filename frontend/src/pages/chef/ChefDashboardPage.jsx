import { useMemo, useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import { formatCurrency } from '../../utils/formatCurrency';
import SparklineAreaChart from '../../components/charts/SparklineAreaChart';

function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function ChefDashboardPage() {
  const session = useAppStore((state) => state.session);
  const foods = useAppStore((state) => state.foods.filter((item) => item.chefId === session?.chefId));
  const orders = useAppStore((state) => state.orders.filter((item) => item.chefId === session?.chefId));
  const reviews = useAppStore((state) => state.reviews.filter((item) => item.chefId === session?.chefId));
  const updateFoodByChef = useAppStore((state) => state.updateFoodByChef);
  const [draftPrices, setDraftPrices] = useState({});

  const todaysOrders = useMemo(() => {
    const today = new Date();
    return orders.filter((order) => isSameDay(new Date(order.createdAt), today));
  }, [orders]);

  const pendingDeliveries = useMemo(() => orders.filter((order) => order.status !== 'delivered').length, [orders]);

  const todayEarnings = useMemo(
    () => todaysOrders.reduce((total, order) => total + order.total, 0),
    [todaysOrders]
  );

  const kitchenRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);

  const recentOrders = useMemo(
    () => orders.slice().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 7),
    [orders]
  );

  const weeklyEarningsSeries = useMemo(() => {
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const now = new Date();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    return labels.map((label, index) => {
      const start = new Date(monday);
      start.setDate(monday.getDate() + index);
      const end = new Date(start);
      end.setDate(start.getDate() + 1);

      const value = orders
        .filter((order) => {
          const time = new Date(order.createdAt).getTime();
          return time >= start.getTime() && time < end.getTime();
        })
        .reduce((sum, order) => sum + order.total, 0);

      return { label, value };
    });
  }, [orders]);

  const savePrice = (foodId, fallbackPrice) => {
    const value = draftPrices[foodId];
    const parsed = Number(value ?? fallbackPrice);
    if (!Number.isFinite(parsed) || parsed < 50) {
      return;
    }

    updateFoodByChef({ foodId, price: parsed });
  };

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-emerald-50 via-amber-50 to-orange-50 p-6" data-reveal="enter">
        <div className="absolute -right-20 -top-16 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="absolute -bottom-16 left-20 h-48 w-48 rounded-full bg-orange-200/35 blur-3xl" />

        <SectionTitle
          eyebrow="Chef Dashboard"
          title={`Welcome back, ${session?.name || 'Chef'}`}
          subtitle="Manage menu availability, recent orders, and weekly earnings in one handcrafted control center."
        />
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-reveal="enter">
        <article className="hb-surface hb-hover-lift rounded-2xl border border-orange-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today&apos;s Orders</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{todaysOrders.length}</p>
        </article>
        <article className="hb-surface hb-hover-lift rounded-2xl border border-orange-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pending Deliveries</p>
          <p className="mt-1 text-2xl font-bold text-orange-700">{pendingDeliveries}</p>
        </article>
        <article className="hb-surface hb-hover-lift rounded-2xl border border-emerald-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Today&apos;s Earnings</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{formatCurrency(todayEarnings)}</p>
        </article>
        <article className="hb-surface hb-hover-lift rounded-2xl border border-emerald-100 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Kitchen Rating</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{kitchenRating} / 5</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.45fr_1fr]" data-reveal="enter">
        <article className="hb-surface rounded-2xl border border-orange-100 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-2 py-2">Order</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Address</th>
                  <th className="px-2 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-orange-50 last:border-none">
                    <td className="px-2 py-2 font-semibold text-slate-800">{order.id}</td>
                    <td className="px-2 py-2 capitalize text-slate-600">{order.status.replaceAll('_', ' ')}</td>
                    <td className="px-2 py-2 text-slate-600">{order.address}</td>
                    <td className="px-2 py-2 text-right font-semibold text-slate-800">{formatCurrency(order.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="hb-surface rounded-2xl border border-emerald-100 bg-white p-5">
          <h3 className="text-lg font-bold text-slate-900">Weekly Earnings Graph</h3>
          <p className="mt-1 text-sm text-slate-600">Day-by-day earnings trend for this week.</p>
          <div className="mt-4">
            <SparklineAreaChart data={weeklyEarningsSeries} stroke="#16a34a" fill="rgba(22, 163, 74, 0.18)" />
          </div>
        </article>
      </section>

      <section className="hb-surface rounded-2xl border border-orange-100 bg-white p-5" data-reveal="enter">
        <h3 className="text-lg font-bold text-slate-900">Menu Management Cards</h3>
        <p className="mt-1 text-sm text-slate-600">Edit prices and toggle dish availability instantly.</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {foods.map((food) => (
            <article key={food.id} className="hb-hover-lift rounded-xl border border-orange-100 bg-white p-3">
              <img src={food.image} alt={food.title} className="h-32 w-full rounded-lg object-cover" />
              <p className="mt-2 text-sm font-bold text-slate-900">{food.title}</p>
              <p className="text-xs text-slate-500">{food.prepTime}</p>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="number"
                  min="50"
                  value={draftPrices[food.id] ?? food.price}
                  onChange={(event) =>
                    setDraftPrices((state) => ({
                      ...state,
                      [food.id]: event.target.value
                    }))
                  }
                  className="hb-input"
                />
                <button
                  className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
                  onClick={() => savePrice(food.id, food.price)}
                  type="button"
                >
                  Edit
                </button>
              </div>

              <button
                className="mt-2 w-full rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                onClick={() => updateFoodByChef({ foodId: food.id, isAvailable: !food.isAvailable })}
                type="button"
              >
                {food.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ChefDashboardPage;
