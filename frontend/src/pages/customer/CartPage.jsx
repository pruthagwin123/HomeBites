import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatCurrency';

function CartPage() {
  const navigate = useNavigate();
  const cart = useAppStore((state) => state.getCartDetails());
  const updateQuantity = useAppStore((state) => state.updateCartQuantity);

  return (
    <main className="hb-page">
      <SectionTitle eyebrow="Cart" title="Review your selected meals" subtitle="Adjust quantity before you continue to checkout." />

      {cart.items.length === 0 ? (
        <article className="hb-surface rounded-xl border border-dashed border-orange-200 bg-white p-8 text-center text-slate-600" data-reveal="enter">
          Your cart is empty. Add a meal to continue.
        </article>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]" data-reveal="enter">
          <section className="space-y-3">
            {cart.items.map((item) => (
              <article key={item.foodId} className="hb-surface flex items-center gap-3 rounded-xl border border-orange-100 bg-white p-3">
                <img src={item.image} alt={item.title} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-600">by {item.chefName}</p>
                  <p className="text-sm font-bold text-emerald-700">{formatCurrency(item.lineTotal)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="h-8 w-8 rounded-full bg-orange-100 text-lg font-semibold text-orange-700 transition hover:bg-orange-200"
                    onClick={() => updateQuantity(item.foodId, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    className="h-8 w-8 rounded-full bg-orange-100 text-lg font-semibold text-orange-700 transition hover:bg-orange-200"
                    onClick={() => updateQuantity(item.foodId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="hb-surface h-fit rounded-xl border border-orange-100 bg-white p-4">
            <h3 className="text-lg font-bold text-slate-900">Bill details</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery</span>
                <span>{formatCurrency(cart.deliveryFee)}</span>
              </div>
              <div className="flex justify-between border-t border-orange-100 pt-2 text-base font-bold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(cart.total)}</span>
              </div>
            </div>
            <Button className="mt-4 w-full bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/customer/checkout')}>
              Proceed to Checkout
            </Button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage;
