import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppStore } from '../../app/store/useAppStore';
import Button from '../ui/Button';

function TopNav() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const session = useAppStore((state) => state.session);
  const logout = useAppStore((state) => state.logout);

  const customerLinks = [
    { to: '/customer/dashboard', label: 'Home' },
    { to: '/customer/discover', label: 'What would you like to eat today?' },
    { to: '/customer/browse', label: "Today's specials" },
    { to: '/customer/cart', label: 'Cart' },
    { to: '/customer/wallet', label: 'Wallet balance' },
    { to: '/customer/subscriptions', label: 'Meal plans' },
    { to: '/customer/chat', label: 'Chat with chef' },
    { to: '/customer/saved', label: 'Saved choices' },
    { to: '/customer/reviews', label: 'Your reviews' }
  ];

  const chefLinks = [
    { to: '/chef/dashboard', label: 'Kitchen home' },
    { to: '/chef/menu', label: 'Menu' },
    { to: '/chef/orders', label: 'Incoming orders' }
  ];

  const links = session?.role === 'chef' ? chefLinks : customerLinks;

  return (
    <header className="sticky top-0 z-50 mb-7 rounded-2xl border border-orange-100 bg-white/95 px-4 py-3 shadow-[0_10px_26px_rgba(15,23,42,0.09)] backdrop-blur sm:px-6" data-reveal="enter">
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="group">
          <p className="text-xl font-black tracking-tight text-orange-600 transition group-hover:text-orange-700 sm:text-2xl">
            HomeBites
          </p>
          <p className="text-[11px] text-emerald-700 sm:text-xs">Freshly cooked by nearby home chefs</p>
        </Link>

        <div className="hidden flex-1 items-center justify-center lg:flex">
          {session ? (
            <nav className="flex flex-wrap items-center justify-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-1.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-orange-100 text-orange-700 shadow-sm'
                        : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          {session ? (
            <>
              <span className="rounded-full bg-cream-200 px-3 py-1 text-xs font-semibold text-slate-700">
                {session.name}
              </span>
              <Button
                className="bg-slate-700 px-3 py-2 text-xs hover:bg-slate-800"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-orange-500 px-3 py-2 text-xs hover:bg-orange-600" onClick={() => navigate('/auth/customer')}>
                Customer Login
              </Button>
              <Button className="bg-emerald-600 px-3 py-2 text-xs hover:bg-emerald-700" onClick={() => navigate('/auth/chef')}>
                Chef Login
              </Button>
            </>
          )}
        </div>

        <button
          className="inline-flex items-center rounded-xl border border-orange-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
          type="button"
        >
          Menu
        </button>
      </div>

      {mobileOpen ? (
        <div className="mt-4 space-y-2 border-t border-orange-100 pt-4 lg:hidden">
          {session ? (
            <>
              <p className="text-xs font-semibold text-slate-500">Signed in as {session.name}</p>
              <nav className="grid gap-1">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-orange-100 text-orange-700' : 'text-slate-700 hover:bg-orange-50'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              <Button
                className="mt-2 w-full bg-slate-700 hover:bg-slate-800"
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="grid gap-2">
              <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={() => navigate('/auth/customer')}>
                Customer Login
              </Button>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => navigate('/auth/chef')}>
                Chef Login
              </Button>
            </div>
          )}
        </div>
      ) : null}
    </header>
  );
}

export default TopNav;
