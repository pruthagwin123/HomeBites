import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';
import OrderTimeline from '../../components/common/OrderTimeline';
import SectionTitle from '../../components/common/SectionTitle';

function OrderTrackingPage() {
  const session = useAppStore((state) => state.session);
  const orders = useAppStore((state) => state.orders);

  const activeOrder = useMemo(
    () =>
      orders.find((item) => item.customerId === session?.id && item.status !== 'delivered') ||
      orders.find((item) => item.customerId === session?.id),
    [orders, session]
  );

  return (
    <main className="space-y-6">
      <SectionTitle
        eyebrow="Live Tracking"
        title="Your order journey"
        subtitle="Follow each kitchen and delivery milestone in real time."
      />

      {activeOrder ? (
        <section className="grid gap-4 rounded-2xl border border-orange-100 bg-white p-5 sm:grid-cols-[1.1fr_1fr]">
          <div>
            <p className="text-sm text-slate-500">Order ID</p>
            <p className="text-lg font-bold text-slate-900">{activeOrder.id}</p>
            <p className="mt-2 text-sm text-slate-600">Delivery to: {activeOrder.address}</p>

            <div className="mt-4 rounded-xl bg-orange-50 p-3">
              <p className="text-xs text-slate-500">Delivery OTP</p>
              <p className="text-2xl font-black tracking-[0.2em] text-orange-700">{activeOrder.deliveryOtp || '----'}</p>
              <p className="mt-1 text-xs text-slate-600">For secure doorstep verification</p>
            </div>

            <div className="mt-3 space-y-1 text-xs text-slate-600">
              <p>OTP generated at: {activeOrder.otpGeneratedAt ? new Date(activeOrder.otpGeneratedAt).toLocaleString() : 'Pending'}</p>
              <p>OTP verified at: {activeOrder.otpVerifiedAt ? new Date(activeOrder.otpVerifiedAt).toLocaleString() : 'Pending'}</p>
              <p>Delivered at: {activeOrder.deliveredAt ? new Date(activeOrder.deliveredAt).toLocaleString() : 'Pending'}</p>
              <p>Delivery proof: {activeOrder.deliveryProofPhotoName || 'Not uploaded yet'}</p>
            </div>

            <Link
              className="mt-4 inline-flex rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
              to={`/delivery/verify/${activeOrder.id}`}
            >
              Open Delivery Partner Verification
            </Link>
          </div>
          <OrderTimeline status={activeOrder.status} />
        </section>
      ) : (
        <p className="rounded-xl border border-dashed border-orange-200 bg-white p-6 text-sm text-slate-600">No active orders yet.</p>
      )}
    </main>
  );
}

export default OrderTrackingPage;
