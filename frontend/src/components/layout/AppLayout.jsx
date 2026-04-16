import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TopNav from './TopNav';
import Footer from './Footer';

const makeBannerFallback = (title) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='560' viewBox='0 0 1400 560'>
      <defs>
        <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
          <stop offset='0%' stop-color='#f97316'/>
          <stop offset='100%' stop-color='#10b981'/>
        </linearGradient>
      </defs>
      <rect width='1400' height='560' fill='url(#g)'/>
      <rect width='1400' height='560' fill='rgba(15,23,42,0.28)'/>
      <text x='70' y='300' fill='white' font-family='Segoe UI, Arial, sans-serif' font-size='56' font-weight='700'>${title}</text>
    </svg>`
  )}`;

const routeBanners = [
  {
    match: (path) => path.startsWith('/auth/customer'),
    title: 'Welcome to your customer space',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  },
  {
    match: (path) => path.startsWith('/auth/chef'),
    title: 'Chef login and kitchen command',
    images: [
      'https://images.pexels.com/photos/4252139/pexels-photo-4252139.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/6287250/pexels-photo-6287250.jpeg?auto=compress&cs=tinysrgb&w=1400',
      'https://images.pexels.com/photos/3338537/pexels-photo-3338537.jpeg?auto=compress&cs=tinysrgb&w=1400'
    ]
  },
  {
    match: (path) => path.startsWith('/customer'),
    title: 'Fresh meals curated for you',
    image:
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80'
  },
  {
    match: (path) => path.startsWith('/chef'),
    title: 'Run your kitchen like a pro',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1400&q=80'
  },
  {
    match: (path) => path.startsWith('/delivery'),
    title: 'Secure and verified delivery flow',
    image:
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1400&q=80'
  },
  {
    match: () => true,
    title: 'Handcrafted home food experience',
    image:
      'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1400&q=80'
  }
];

function AppLayout({ children }) {
  const location = useLocation();
  const banner = routeBanners.find((entry) => entry.match(location.pathname)) || routeBanners[routeBanners.length - 1];
  const bannerImages = useMemo(() => banner.images || [banner.image], [banner]);
  const [bannerIndex, setBannerIndex] = useState(0);
  const isAuthRoute = location.pathname.startsWith('/auth');

  const fallbackBannerImage = useMemo(() => makeBannerFallback(banner.title), [banner.title]);

  useEffect(() => {
    setBannerIndex(0);
  }, [location.pathname]);

  useEffect(() => {
    if (bannerImages.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setBannerIndex((current) => (current + 1) % bannerImages.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [bannerImages]);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll("[data-reveal='enter']"));
    if (!targets.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-warm-surface">
      <div className="mx-auto min-h-screen max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <TopNav />
        <section
          className="relative mb-6 overflow-hidden rounded-2xl border border-orange-100"
          data-reveal="enter"
        >
          <div className="relative h-44 w-full overflow-hidden sm:h-56">
            <div
              className="flex h-full w-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${bannerIndex * 100}%)` }}
            >
              {bannerImages.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="h-full min-w-full object-cover object-center"
                  onError={(event) => {
                    if (event.currentTarget.src !== fallbackBannerImage) {
                      event.currentTarget.src = fallbackBannerImage;
                    }
                  }}
                />
              ))}
            </div>
            <div
              className={`absolute inset-0 ${
                isAuthRoute
                  ? 'bg-gradient-to-r from-slate-900/45 via-slate-900/25 to-transparent'
                  : 'bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-transparent'
              }`}
            />
          </div>
          <div className="absolute inset-0 flex items-end p-4 sm:p-6">
            <p className="text-lg font-bold text-white sm:text-2xl">{banner.title}</p>
          </div>
        </section>
        {children}
        {!location.pathname.startsWith('/auth') ? <Footer /> : null}
      </div>
    </div>
  );
}

export default AppLayout;
