import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import { useAppStore } from '../../app/store/useAppStore';

function DeliveryOtpVerificationPage() {
  const { orderId } = useParams();
  const orders = useAppStore((state) => state.orders);
  const verifyDeliveryOtp = useAppStore((state) => state.verifyDeliveryOtp);
  const confirmDeliveryWithProof = useAppStore((state) => state.confirmDeliveryWithProof);

  const order = useMemo(() => orders.find((item) => item.id === orderId), [orders, orderId]);

  const [otp, setOtp] = useState('');
  const [deliveryPartnerName, setDeliveryPartnerName] = useState('Rohan (Delivery Partner)');
  const [proofPhotoFileName, setProofPhotoFileName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verified, setVerified] = useState(Boolean(order?.otpVerifiedAt));

  const submit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const result = verifyDeliveryOtp({
      orderId,
      otp,
      deliveryPartnerName
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess('OTP verified successfully. Please upload delivery proof to complete handoff.');
    setVerified(true);
    setOtp('');
  };

  const confirmProof = () => {
    setError('');
    setSuccess('');

    const result = confirmDeliveryWithProof({ orderId, proofPhotoName: proofPhotoFileName });
    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSuccess('Delivery completed and proof captured successfully.');
  };

  if (!order) {
    return (
      <main className="hb-page mx-auto max-w-2xl">
        <section className="hb-surface rounded-2xl border border-dashed border-orange-200 bg-white p-6 text-center text-slate-600" data-reveal="enter">
          Order not found.
        </section>
      </main>
    );
  }

  return (
    <main className="hb-page mx-auto max-w-2xl">
      <section className="hb-surface rounded-2xl border border-orange-100 bg-white p-6 shadow-sm" data-reveal="enter">
        <SectionTitle
          eyebrow="Delivery Partner Verification"
          title="Confirm customer handoff with a secure OTP"
          subtitle="Enter customer OTP and upload delivery proof photo to complete the order securely."
        />

        <div className="mt-4 rounded-xl bg-orange-50 p-4 text-sm text-slate-700">
          <p>Order ID: {order.id}</p>
          <p>Delivery Address: {order.address}</p>
          <p>Status: {order.status.replaceAll('_', ' ')}</p>
        </div>

        <form className="mt-4 space-y-3" onSubmit={submit}>
          <input
            required
            maxLength={4}
            pattern="[0-9]{4}"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 4))}
            placeholder="Enter 4-digit OTP"
            className="hb-input w-full rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-center text-xl font-bold tracking-[0.3em] outline-none focus:border-orange-400"
          />

          <input
            required
            value={deliveryPartnerName}
            onChange={(event) => setDeliveryPartnerName(event.target.value)}
            placeholder="Delivery partner name"
            className="hb-input w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-400"
          />

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
          {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}

          <button className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700" type="submit">
            Verify OTP
          </button>
        </form>

        <section className="mt-4 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4" data-reveal="enter">
          <h3 className="text-base font-bold text-slate-900">Step 2: Upload proof and complete delivery</h3>
          <label className="block rounded-xl border border-orange-200 bg-white p-3 text-sm text-slate-700">
            Upload delivery proof photo
            <input
              required
              type="file"
              accept="image/*"
              className="mt-2 w-full text-sm"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setProofPhotoFileName(file ? file.name : '');
              }}
            />
            {proofPhotoFileName ? <p className="mt-2 text-xs text-emerald-700">Selected: {proofPhotoFileName}</p> : null}
          </label>

          <button
            className="w-full rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={confirmProof}
            disabled={!verified}
            type="button"
          >
            Confirm Delivery with Proof
          </button>
          {!verified ? <p className="text-xs text-slate-500">OTP verification is required before final confirmation.</p> : null}
        </section>
      </section>

      {order.status === 'delivered' ? (
        <section className="hb-surface rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm" data-reveal="enter">
          <h3 className="text-lg font-bold text-slate-900">Delivery confirmation details</h3>
          <div className="mt-3 space-y-2 text-sm text-slate-700">
            <p>Delivered At: {order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : 'Pending'}</p>
            <p>Confirmed By: {order.deliveryConfirmedBy || 'Pending'}</p>
            <p>Proof Photo: {order.deliveryProofPhotoName || 'Pending upload'}</p>
            <p>OTP Verified At: {order.otpVerifiedAt ? new Date(order.otpVerifiedAt).toLocaleString() : 'Pending'}</p>
          </div>
        </section>
      ) : null}
    </main>
  );
}

export default DeliveryOtpVerificationPage;
