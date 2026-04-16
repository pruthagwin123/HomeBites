import { useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import FoodCard from '../../components/common/FoodCard';
import ChefProfileCard from '../../components/common/ChefProfileCard';
import CouponCard from '../../components/common/CouponCard';

const dietOptions = [
  { id: 'high-protein', label: 'High Protein' },
  { id: 'low-oil', label: 'Low Oil' },
  { id: 'diabetic-friendly', label: 'Diabetic Friendly' },
  { id: 'vegetarian', label: 'Vegetarian' }
];

function DiscoverPage() {
  const [localFilters, setLocalFilters] = useState([]);
  const setDietFilters = useAppStore((state) => state.setDietFilters);
  const getFilteredFoods = useAppStore((state) => state.getFilteredFoods);
  const getNearbyChefs = useAppStore((state) => state.getNearbyChefs);
  const getTopRatedKitchens = useAppStore((state) => state.getTopRatedKitchens);
  const coupons = useAppStore((state) => state.coupons);
  const applyCoupon = useAppStore((state) => state.applyCoupon);
  const addToCart = useAppStore((state) => state.addToCart);

  const foods = getFilteredFoods();
  const nearbyChefs = getNearbyChefs();
  const topKitchens = getTopRatedKitchens();

  const toggleFilter = (id) => {
    const next = localFilters.includes(id) ? localFilters.filter((item) => item !== id) : [...localFilters, id];
    setLocalFilters(next);
    setDietFilters(next);
  };

  return (
    <main className="hb-page">
      <SectionTitle
        eyebrow="Smart Discovery"
        title="Find meals that match your lifestyle"
        subtitle="Use diet filters, explore nearby chefs, and unlock promo offers in one place."
      />

      <section className="hb-surface rounded-2xl border border-orange-100 bg-white p-4" data-reveal="enter">
        <h3 className="text-base font-bold text-slate-900">Diet and wellness filters</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {dietOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => toggleFilter(item.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                localFilters.includes(item.id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-orange-50 text-slate-700 hover:bg-orange-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3" data-reveal="enter">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} coupon={coupon} onApply={applyCoupon} />
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2" data-reveal="enter">
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">Chefs near you</h3>
          {nearbyChefs.map((chef) => (
            <ChefProfileCard key={chef.id} chef={chef} compact />
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold text-slate-900">Top-rated home kitchens</h3>
          {topKitchens.map((chef) => (
            <ChefProfileCard key={chef.id} chef={chef} compact />
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-reveal="enter">
        {foods.map((item) => (
          <FoodCard key={item.id} item={item} onAddToCart={addToCart} />
        ))}
      </section>
    </main>
  );
}

export default DiscoverPage;
