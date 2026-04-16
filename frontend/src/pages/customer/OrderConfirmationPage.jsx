import { Link } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';
import SectionTitle from '../../components/common/SectionTitle';

function OrderConfirmationPage() {
  const order = useAppStore((state) => state.lastPlacedOrder);

  return (
    <main className="mx-auto max-w-2xl space-y-6">
      <section className="rounded-2xl border border-emerald-100 bg-white p-6 text-center shadow-sm">
        <p className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl">✓</p>
        <SectionTitle
          eyebrow="Order Confirmed"
          title="Your meal is on the way"
          subtitle="Thanks for ordering from HomeBites. We have sent your chef the cooking request."
        />
        <div className="mt-4 rounded-xl bg-orange-50 p-4 text-sm text-slate-700">
          <p>Order ID: {order?.id || 'N/A'}</p>
          <p>Delivery address: {order?.address || 'Not available'}</p>
          <p className="mt-2 font-semibold text-orange-700">Secure Delivery OTP: {order?.deliveryOtp || 'Will be generated shortly'}</p>
          <p className="text-xs text-slate-600">Share this OTP only with the delivery partner at your doorstep.</p>
          <p className="mt-1 text-xs text-slate-500">Email notification payload ready for integration with your mail service.</p>
        </div>
        <div className="mt-5 flex justify-center gap-3">
          <Link className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600" to="/customer/tracking">
            Track Order
          </Link>
          <Link className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" to="/customer/browse">
            Order More
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderConfirmationPage;
