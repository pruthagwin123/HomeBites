import { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';
import Button from '../../components/ui/Button';

function AuthPage() {
  const { role } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const signup = useAppStore((state) => state.signup);

  const validRole = useMemo(() => (role === 'chef' ? 'chef' : 'customer'), [role]);

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState(location.state?.authMessage || '');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  const sideHero = useMemo(
    () =>
      validRole === 'chef'
        ? {
            src: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
            alt: 'Chef at work',
            title: 'Kitchen Focus',
            subtitle: 'Plan, cook, and serve'
          }
        : {
            src: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=1200&q=80',
            alt: 'Homemade meal',
            title: 'Home Cooked',
            subtitle: 'Meals made with warmth'
          },
    [validRole]
  );

  const authImageFallback = (label) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='600' viewBox='0 0 900 600'>
        <defs>
          <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0%' stop-color='#fb923c'/>
            <stop offset='100%' stop-color='#34d399'/>
          </linearGradient>
        </defs>
        <rect width='900' height='600' fill='url(#bg)'/>
        <rect width='900' height='600' fill='rgba(2,6,23,0.25)'/>
        <text x='70' y='330' fill='white' font-family='Segoe UI, Arial, sans-serif' font-size='54' font-weight='700'>${label}</text>
      </svg>`
    )}`;

  const authCopy = useMemo(() => {
    if (validRole === 'chef') {
      return {
        loginTitle: 'Welcome back, Chef',
        loginSubtitle: 'Login now and start preparing delightful foods for your happy customers.',
        signupTitle: 'Join HomeBites as a Chef',
        signupSubtitle: 'Create your chef account and start serving handcrafted meals in your neighborhood.'
      };
    }

    return {
      loginTitle: 'Welcome back, Hungry Star',
      loginSubtitle: 'Login to discover cozy homemade delights from chefs around your neighborhood.',
      signupTitle: 'Create your Customer Account',
      signupSubtitle: 'Sign up and start ordering fresh home-cooked meals with easy tracking and rewards.'
    };
  }, [validRole]);

  const validate = () => {
    if (mode === 'signup' && form.name.trim().length < 2) {
      return 'Please enter your full name.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return 'Please enter a valid email address.';
    }

    if (form.password.length < 6) {
      return 'Password must be at least 6 characters.';
    }

    return '';
  };

  const submit = (event) => {
    event.preventDefault();
    setError('');
    setInfoMessage('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = { ...form, role: validRole };
    const result = mode === 'login' ? login(payload) : signup(payload);

    if (!result.ok) {
      setError(result.message || 'Unable to continue. Please try again.');
      return;
    }

    navigate(validRole === 'chef' ? '/chef/dashboard' : '/customer/dashboard');
  };

  const startGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError('Google login is not configured yet. Add VITE_GOOGLE_CLIENT_ID in frontend/.env.');
      return;
    }

    const redirectUri = `${window.location.origin}/auth/google/callback`;
    const scopes = ['openid', 'email', 'profile'].join(' ');
    const oauthUrl =
      'https://accounts.google.com/o/oauth2/v2/auth' +
      `?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes)}` +
      `&include_granted_scopes=true` +
      `&prompt=select_account` +
      `&state=${encodeURIComponent(validRole)}`;

    window.location.assign(oauthUrl);
  };

  const sendResetLink = async () => {
    setError('');
    setInfoMessage('');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setError('Please enter a valid email for password reset.');
      return;
    }

    setForgotLoading(true);
    try {
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail, role: validRole })
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        setError(payload.message || 'Unable to send reset link right now.');
        return;
      }

      const devResetLink = payload?.data?.resetLink;
      setInfoMessage(devResetLink ? `Reset link generated: ${devResetLink}` : 'Reset link sent to your email. Please check your inbox.');
      setForgotOpen(false);
      setForgotEmail('');
    } catch {
      setError('Network error while sending reset link.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section
        className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 p-6 sm:p-8"
        data-reveal="enter"
      >
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="relative grid gap-6 lg:grid-cols-[1fr_1.1fr_1fr] lg:items-center">
          {/* LEFT SIDE - Images */}
          <article className="hidden lg:flex flex-col justify-center">
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-white/70 transition">
              <div className="relative h-[28rem]">
                <img
                  src={sideHero.src}
                  alt={sideHero.alt}
                  className="h-full w-full object-cover object-center"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = authImageFallback(sideHero.title);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-xl font-bold">{sideHero.title}</p>
                  <p className="mt-1 text-sm text-white/90">{sideHero.subtitle}</p>
                </div>
              </div>
            </div>
          </article>

          {/* CENTER - Login Form */}
          <article className="hb-surface rounded-3xl border border-orange-100 bg-white p-10 shadow-lg lg:min-h-[36rem]">
            {/* Left images info cards */}
            <div className="mb-4 space-y-3 lg:hidden">
              <div className="grid grid-cols-3 gap-2">
                {/* Chef Cooking - Large */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition col-span-2 row-span-2 h-32">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
                    alt="Expert Chef"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = authImageFallback('Expert Chefs');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-xs font-bold">Expert Chefs</p>
                  </div>
                </div>

                {/* Fresh Food */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition h-16">
                  <img
                    src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop"
                    alt="Fresh Food"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = authImageFallback('Fresh Food');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Happy Customer */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition h-16">
                  <img
                    src="https://images.unsplash.com/photo-1507925591917-351e92b47b3f?w=200&h=200&fit=crop"
                    alt="Happy Customer"
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = authImageFallback('Happy Eaters');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              </div>
            </div>

            <div className="flex rounded-xl bg-orange-50 p-1 mb-6">
              <button
                className={`w-1/2 rounded-lg px-4 py-3 text-base font-semibold transition ${
                  mode === 'login' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600'
                }`}
                onClick={() => setMode('login')}
                type="button"
              >
                Login
              </button>
              <button
                className={`w-1/2 rounded-lg px-4 py-3 text-base font-semibold transition ${
                  mode === 'signup' ? 'bg-white text-orange-700 shadow-sm' : 'text-slate-600'
                }`}
                onClick={() => setMode('signup')}
                type="button"
              >
                Signup
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="mb-4">
                <h3 className="text-3xl font-bold text-slate-900">
                  {mode === 'login' ? authCopy.loginTitle : authCopy.signupTitle}
                </h3>
                <p className="text-lg text-slate-600 mt-2">
                  {mode === 'login' ? authCopy.loginSubtitle : authCopy.signupSubtitle}
                </p>
              </div>

              {infoMessage ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  {infoMessage}
                </div>
              ) : null}

              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                  {error}
                </div>
              ) : null}
            </div>

            <form className="mt-6 space-y-4" onSubmit={submit}>
              {mode === 'signup' ? (
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={(event) => setForm((state) => ({ ...state, name: event.target.value }))}
                  className="hb-input text-base py-3"
                />
              ) : null}

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                className="hb-input text-base py-3"
              />

              <input
                required
                minLength={6}
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                className="hb-input text-base py-3"
              />

              <Button className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-base font-semibold" type="submit">
                {mode === 'login' ? 'Continue' : 'Create Account'}
              </Button>

              {mode === 'login' ? (
                <button
                  className="w-full text-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
                  onClick={() => setForgotOpen(true)}
                  type="button"
                >
                  Forgot Password?
                </button>
              ) : null}

              <button
                className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md hover:scale-105 active:scale-98"
                onClick={startGoogleLogin}
                type="button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </button>

              <p className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-700">
                Food with <span className="text-base text-red-500">♥</span> love
              </p>
            </form>
          </article>

          {/* RIGHT SIDE - Images */}
          <article className="hidden lg:flex flex-col justify-center gap-4">
            {/* Right Image 1 */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition h-48">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                alt="Delicious Meals"
                className="w-full h-full object-cover object-center"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = authImageFallback('Delicious Meals');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <p className="text-sm font-bold">Delicious Meals</p>
              </div>
            </div>

            {/* Right Image 2 */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition h-48">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80"
                alt="Community of Chefs"
                className="w-full h-full object-cover object-center"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = authImageFallback('Community');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <p className="text-sm font-bold">Community</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {forgotOpen ? (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4">
          <article className="w-full max-w-md rounded-2xl border border-orange-100 bg-white p-5 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">Forgot Password</h3>
            <p className="mt-1 text-sm text-slate-600">Enter your account email and we&apos;ll send a reset link.</p>

            <input
              type="email"
              placeholder="your@email.com"
              value={forgotEmail}
              onChange={(event) => setForgotEmail(event.target.value)}
              className="hb-input mt-3"
            />

            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" type="button" onClick={sendResetLink} disabled={forgotLoading}>
                {forgotLoading ? 'Sending...' : 'Send Verification Link'}
              </Button>
              <Button className="flex-1 bg-slate-200 text-slate-700 hover:bg-slate-300" type="button" onClick={() => setForgotOpen(false)}>
                Cancel
              </Button>
            </div>
          </article>
        </section>
      ) : null}
    </main>
  );
}

export default AuthPage;
