import { useState } from 'react';
import SectionTitle from '../../components/common/SectionTitle';
import { useAppStore } from '../../app/store/useAppStore';

function SavedPage() {
  const [addressForm, setAddressForm] = useState({ label: '', address: '', landmark: '' });
  const [planForm, setPlanForm] = useState({
    title: '',
    schedule: '',
    tags: 'high-protein,low-oil',
    targetCalories: '500-650 kcal'
  });

  const addresses = useAppStore((state) => state.getSavedAddresses());
  const plans = useAppStore((state) => state.getSavedMealPlans());
  const addAddress = useAppStore((state) => state.addSavedAddress);
  const addPlan = useAppStore((state) => state.addSavedMealPlan);

  return (
    <main className="space-y-6">
      <SectionTitle
        eyebrow="Saved"
        title="Saved addresses and meal plans"
        subtitle="Reuse your frequent delivery spots and favorite nutrition plans."
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-orange-100 bg-white p-4">
          <h3 className="text-lg font-bold text-slate-900">Saved addresses</h3>
          <form
            className="mt-3 space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              addAddress(addressForm);
              setAddressForm({ label: '', address: '', landmark: '' });
            }}
          >
            <input
              required
              placeholder="Label (Home, Office)"
              value={addressForm.label}
              onChange={(event) => setAddressForm((state) => ({ ...state, label: event.target.value }))}
              className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
            />
            <input
              required
              placeholder="Address"
              value={addressForm.address}
              onChange={(event) => setAddressForm((state) => ({ ...state, address: event.target.value }))}
              className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
            />
            <input
              placeholder="Landmark"
              value={addressForm.landmark}
              onChange={(event) => setAddressForm((state) => ({ ...state, landmark: event.target.value }))}
              className="w-full rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm outline-none"
            />
            <button className="w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600" type="submit">
              Save Address
            </button>
          </form>

          <div className="mt-3 space-y-2">
            {addresses.map((address) => (
              <article key={address.id} className="rounded-xl border border-orange-100 bg-orange-50/50 p-3">
                <p className="text-sm font-semibold text-slate-900">{address.label}</p>
                <p className="text-xs text-slate-600">{address.address}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-white p-4">
          <h3 className="text-lg font-bold text-slate-900">Saved meal plans</h3>
          <form
            className="mt-3 space-y-2"
            onSubmit={(event) => {
              event.preventDefault();
              addPlan({
                ...planForm,
                tags: planForm.tags.split(',').map((item) => item.trim()).filter(Boolean)
              });
              setPlanForm({ title: '', schedule: '', tags: 'high-protein,low-oil', targetCalories: '500-650 kcal' });
            }}
          >
            <input
              required
              placeholder="Plan title"
              value={planForm.title}
              onChange={(event) => setPlanForm((state) => ({ ...state, title: event.target.value }))}
              className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm outline-none"
            />
            <input
              required
              placeholder="Schedule"
              value={planForm.schedule}
              onChange={(event) => setPlanForm((state) => ({ ...state, schedule: event.target.value }))}
              className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm outline-none"
            />
            <input
              required
              placeholder="Tags comma separated"
              value={planForm.tags}
              onChange={(event) => setPlanForm((state) => ({ ...state, tags: event.target.value }))}
              className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm outline-none"
            />
            <input
              required
              placeholder="Target calories"
              value={planForm.targetCalories}
              onChange={(event) => setPlanForm((state) => ({ ...state, targetCalories: event.target.value }))}
              className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm outline-none"
            />
            <button className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" type="submit">
              Save Meal Plan
            </button>
          </form>

          <div className="mt-3 space-y-2">
            {plans.map((plan) => (
              <article key={plan.id} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                <p className="text-sm font-semibold text-slate-900">{plan.title}</p>
                <p className="text-xs text-slate-600">{plan.schedule}</p>
                <p className="mt-1 text-xs text-emerald-700">{plan.tags.join(' · ')}</p>
              </article>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default SavedPage;
