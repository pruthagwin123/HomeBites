import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../../app/store/useAppStore';

function GoogleAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const googleLogin = useAppStore((state) => state.googleLogin);

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    const accessToken = hashParams.get('access_token');
    const rawState = hashParams.get('state') || searchParams.get('state') || 'customer';
    const role = rawState === 'chef' ? 'chef' : 'customer';

    async function completeGoogleLogin() {
      if (!accessToken) {
        navigate(`/auth/${role}`, {
          replace: true,
          state: { authMessage: 'Google sign-in was cancelled or failed. Please try again.' }
        });
        return;
      }

      try {
        const profileResponse = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${encodeURIComponent(accessToken)}`
        );
        const profile = await profileResponse.json();

        const result = googleLogin({
          email: profile.email,
          name: profile.name || 'Google User',
          role
        });

        if (!result.ok) {
          navigate(`/auth/${role}`, {
            replace: true,
            state: { authMessage: result.message || 'Google login failed.' }
          });
          return;
        }

        navigate(role === 'chef' ? '/chef/dashboard' : '/customer/dashboard', { replace: true });
      } catch {
        navigate(`/auth/${role}`, {
          replace: true,
          state: { authMessage: 'Google login failed due to a network issue. Please retry.' }
        });
      }
    }

    completeGoogleLogin();
  }, [navigate, searchParams, googleLogin]);

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section className="hb-surface rounded-2xl border border-orange-100 bg-white p-8 text-center" data-reveal="enter">
        <h1 className="text-2xl font-bold text-slate-900">Signing you in with Google...</h1>
        <p className="mt-2 text-sm text-slate-600">Please wait while we securely complete your login.</p>
      </section>
    </main>
  );
}

export default GoogleAuthCallbackPage;
