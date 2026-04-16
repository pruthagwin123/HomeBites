import { useMemo, useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import FoodCard from '../../components/common/FoodCard';
import SectionTitle from '../../components/common/SectionTitle';
import { formatCurrency } from '../../utils/formatCurrency';

function BrowseMealsPage() {
  const foods = useAppStore((state) => state.foods);
  const addToCart = useAppStore((state) => state.addToCart);
  const getPriceComparison = useAppStore((state) => state.getPriceComparison);
  const [search, setSearch] = useState('');

  const filteredFoods = useMemo(
    () => foods.filter((item) => `${item.title} ${item.chefName}`.toLowerCase().includes(search.toLowerCase())),
    [foods, search]
  );

  const comparisons = getPriceComparison();

  return (
    <main className="hb-page">
      <SectionTitle
        eyebrow="Today's Specials"
        title="What would you like to eat today?"
        subtitle="Compare dish prices across chefs and pick what suits your taste and budget."
      />

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search for a dish or chef"
        className="w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm outline-none focus:border-orange-400"
      />

      <section className="hb-surface rounded-2xl border border-emerald-100 bg-white p-4 sm:p-6" data-reveal="enter">
        <h3 className="text-lg font-bold text-slate-900">Smart price comparison</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((row) => (
            <article key={row.dishId} className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
              <p className="text-sm font-bold text-slate-900">{row.title}</p>
              <p className="text-xs text-slate-600">Lowest from {row.chefName}</p>
              <p className="mt-1 text-base font-black text-emerald-700">{formatCurrency(row.price)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-reveal="enter">
        {filteredFoods.map((item) => (
          <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </section>
    </main>
  );
}

export default BrowseMealsPage;
