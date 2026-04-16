import { useMemo, useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';

function ReviewsPage() {
  const session = useAppStore((state) => state.session);
  const reviews = useAppStore((state) => state.reviews);
  const foods = useAppStore((state) => state.foods);
  const submitReview = useAppStore((state) => state.submitReview);
  const [form, setForm] = useState({ foodId: '', rating: 5, comment: '' });

  const foodOptions = useMemo(() => foods.slice(0, 8), [foods]);

  const onSubmit = (event) => {
    event.preventDefault();
    const selectedFood = foods.find((item) => item.id === form.foodId);
    if (!selectedFood) {
      return;
    }

    submitReview({
      foodId: selectedFood.id,
      chefId: selectedFood.chefId,
      rating: Number(form.rating),
      comment: form.comment
    });

    setForm({ foodId: '', rating: 5, comment: '' });
  };

  return (
    <main className="space-y-8">
      <SectionTitle
        eyebrow="Ratings and Reviews"
        title="Share your experience"
        subtitle="Your feedback helps chefs improve and helps customers choose better."
      />

      <section className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <form className="space-y-3 rounded-xl border border-orange-100 bg-white p-4" onSubmit={onSubmit}>
          <p className="text-sm font-bold text-slate-800">Write a review</p>

          <select
            required
            value={form.foodId}
            onChange={(event) => setForm((state) => ({ ...state, foodId: event.target.value }))}
            className="w-full rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
          >
            <option value="">Select a dish</option>
            {foodOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} by {item.chefName}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            max="5"
            value={form.rating}
            onChange={(event) => setForm((state) => ({ ...state, rating: event.target.value }))}
            className="w-full rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
          />

          <textarea
            required
            rows={4}
            placeholder="How was the meal?"
            value={form.comment}
            onChange={(event) => setForm((state) => ({ ...state, comment: event.target.value }))}
            className="w-full rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
          />

          <Button className="w-full bg-orange-500 hover:bg-orange-600" type="submit">
            Submit Review
          </Button>
          <p className="text-xs text-slate-500">Logged in as {session?.name || 'Guest'}</p>
        </form>

        <section className="space-y-3">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-xl border border-orange-100 bg-white p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-900">{review.customerName}</p>
                <p className="text-sm font-semibold text-emerald-700">{review.rating} / 5</p>
              </div>
              <p className="mt-2 text-sm text-slate-600">{review.comment}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}

export default ReviewsPage;
