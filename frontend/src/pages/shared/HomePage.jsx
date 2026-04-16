import { useNavigate } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';

function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Trusted Home Chefs',
      body: 'Every kitchen is profile-verified with hygiene badges, rating history, and transparent prep timing.'
    },
    {
      title: 'Smart Price Comparison',
      body: 'Compare the same dish across nearby chefs and order confidently based on quality and value.'
    },
    {
      title: 'Secure Delivery Handoff',
      body: 'OTP-backed delivery verification and proof capture keep every doorstep handoff safe and trackable.'
    },
    {
      title: 'Wallet, Plans, and Rewards',
      body: 'Track cashback, activate meal subscriptions, and manage weekly food routines in one place.'
    }
  ];

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section
        className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 p-6 sm:p-10"
        data-reveal="enter"
      >
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-orange-200/45 blur-3xl" />
        <div className="absolute -bottom-16 left-24 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
          <div className="space-y-6">
            <SectionTitle
              eyebrow="Handcrafted Home Food"
              title="A premium home-food experience for every neighborhood"
              subtitle="HomeBites connects customers with trusted home chefs through a warm, local, and reliable delivery experience."
            />

            <div className="flex flex-wrap gap-3">
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/auth/customer')}>
                Start as Customer
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/auth/chef')}>
                Start as Chef
              </Button>
            </div>
          </div>

          <article className="hb-surface rounded-2xl border border-orange-100 bg-white/90 p-5">
            <h3 className="text-lg font-bold text-slate-900">Why families choose HomeBites</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Fresh meals cooked in nearby home kitchens.</li>
              <li>Clear prep ETA, delivery tracking, and OTP handoff.</li>
              <li>Wallet rewards and subscription-friendly pricing.</li>
              <li>Human support from real chefs, not dark kitchens.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-reveal="enter">
        {features.map((feature) => (
          <article key={feature.title} className="hb-surface hb-hover-lift rounded-2xl border border-orange-100 bg-white p-5">
            <h3 className="text-base font-bold text-slate-900">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{feature.body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default HomePage;
