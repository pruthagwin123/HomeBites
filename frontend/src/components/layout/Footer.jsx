import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="mt-10 rounded-2xl border border-orange-100 bg-white/90 px-4 py-6 shadow-sm sm:px-6" data-reveal="enter">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <section>
          <h3 className="text-base font-bold text-slate-900">HomeBites</h3>
          <p className="mt-2 text-sm text-slate-600">Handcrafted home meals from trusted neighborhood chefs.</p>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-800">Explore</h3>
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <Link className="block hover:text-orange-700" to="/customer/discover">What would you like to eat today?</Link>
            <Link className="block hover:text-orange-700" to="/customer/browse">Today&apos;s specials</Link>
            <Link className="block hover:text-orange-700" to="/customer/dashboard">Your recent orders</Link>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-800">For Customers</h3>
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <Link className="block hover:text-orange-700" to="/customer/wallet">Wallet balance</Link>
            <Link className="block hover:text-orange-700" to="/customer/subscriptions">Meal plans</Link>
            <Link className="block hover:text-orange-700" to="/customer/chat">Chat with chef</Link>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-800">For Chefs</h3>
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <Link className="block hover:text-orange-700" to="/chef/dashboard">Kitchen dashboard</Link>
            <Link className="block hover:text-orange-700" to="/chef/menu">Manage menu</Link>
            <Link className="block hover:text-orange-700" to="/chef/orders">Order updates</Link>
          </div>
        </section>
      </div>

      <div className="mt-6 border-t border-orange-100 pt-4 text-xs text-slate-500">
        Built with care for local kitchens and hungry neighborhoods.
      </div>
    </footer>
  );
}

export default Footer;
