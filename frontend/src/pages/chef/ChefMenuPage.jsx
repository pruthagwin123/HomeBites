import { useMemo, useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import FoodCard from '../../components/common/FoodCard';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';

function ChefMenuPage() {
  const session = useAppStore((state) => state.session);
  const foods = useAppStore((state) => state.foods);
  const addFoodByChef = useAppStore((state) => state.addFoodByChef);
  const updateFoodByChef = useAppStore((state) => state.updateFoodByChef);
  const [form, setForm] = useState({
    title: '',
    dishId: 'dish-special',
    price: 180,
    prepTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'
  });

  const chefFoods = useMemo(() => foods.filter((item) => item.chefId === session?.chefId), [foods, session]);

  return (
    <main className="hb-page">
      <SectionTitle
        eyebrow="Menu Manager"
        title="Add, price, and publish your signature dishes"
        subtitle="Keep your menu fresh and update availability in seconds."
      />

      <form
        className="hb-surface grid gap-3 rounded-xl border border-emerald-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5"
        data-reveal="enter"
        onSubmit={(event) => {
          event.preventDefault();
          addFoodByChef(form);
          setForm((state) => ({ ...state, title: '', price: 180 }));
        }}
      >
        <input
          required
          placeholder="Dish title"
          value={form.title}
          onChange={(event) => setForm((state) => ({ ...state, title: event.target.value }))}
          className="hb-input rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
        />
        <input
          required
          placeholder="Dish group id"
          value={form.dishId}
          onChange={(event) => setForm((state) => ({ ...state, dishId: event.target.value }))}
          className="hb-input rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
        />
        <input
          required
          type="number"
          min="50"
          value={form.price}
          onChange={(event) => setForm((state) => ({ ...state, price: event.target.value }))}
          className="hb-input rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
        />
        <input
          required
          placeholder="Prep time"
          value={form.prepTime}
          onChange={(event) => setForm((state) => ({ ...state, prepTime: event.target.value }))}
          className="hb-input rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
        />
        <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit">
          Add Dish
        </Button>
      </form>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-reveal="enter">
        {chefFoods.map((item) => (
          <FoodCard
            key={item.id}
            item={item}
            isChefView
            onPriceChange={(foodId, price) => updateFoodByChef({ foodId, price })}
            onToggleAvailability={(foodId, isAvailable) => updateFoodByChef({ foodId, isAvailable })}
          />
        ))}
      </section>
    </main>
  );
}

export default ChefMenuPage;
