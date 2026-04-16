const modules = [
  'Customer Login / Signup',
  'Chef Login / Signup',
  'Food Listings',
  'Cart',
  'Order Tracking',
  'Wallet',
  'Meal Subscriptions',
  'Ratings & Reviews',
  'Analytics Dashboard',
  'OTP Delivery Verification',
  'Email Notifications'
];

function LandingPage() {
  return (
    <main className="hb-page py-8">
      <section className="hb-surface rounded-2xl bg-white p-6 shadow-sm sm:p-8" data-reveal="enter">
        <h1 className="text-3xl font-bold text-brand-700 sm:text-4xl">HomeBites</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
          A handcrafted full-stack food delivery platform connecting neighborhood chefs with local customers.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" data-reveal="enter">
        {modules.map((item) => (
          <article key={item} className="hb-surface rounded-xl bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-800">{item}</h2>
          </article>
        ))}
      </section>
    </main>
  );
}

export default LandingPage;
