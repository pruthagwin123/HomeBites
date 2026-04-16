import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useAppStore((state) => state.getCartDetails());
  const placeOrder = useAppStore((state) => state.placeOrder);
  const [address, setAddress] = useState('17, Koramangala 4th Block, Bengaluru');
  const [error, setError] = useState('');

  const submit = (event) => {
    event.preventDefault();
    setError('');
    const result = placeOrder({ address });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/customer/order-confirmation');
  };

  return (
    <main className="hb-page grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <section className="hb-surface rounded-xl border border-orange-100 bg-white p-5" data-reveal="enter">
        <SectionTitle
          eyebrow="Checkout"
          title="Confirm your delivery details"
          subtitle="Your order will be packed fresh and delivered with OTP handoff."
        />

        <form className="mt-4 space-y-3" onSubmit={submit}>
          <label className="block text-sm font-semibold text-slate-700">Delivery address</label>
          <textarea
            value={address}
            rows={4}
            onChange={(event) => setAddress(event.target.value)}
            className="hb-input w-full rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 outline-none focus:border-orange-400"
          />

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit">
            Place Order
          </Button>
        </form>
      </section>

      <aside className="hb-surface h-fit rounded-xl border border-emerald-100 bg-white p-5" data-reveal="enter">
        <h3 className="text-lg font-bold text-slate-900">Payment summary</h3>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span>Items total</span>
            <span>{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery</span>
            <span>{formatCurrency(cart.deliveryFee)}</span>
          </div>
          <div className="flex justify-between border-t border-orange-100 pt-2 text-base font-bold text-slate-900">
            <span>Payable now</span>
            <span>{formatCurrency(cart.total)}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default CheckoutPage;
