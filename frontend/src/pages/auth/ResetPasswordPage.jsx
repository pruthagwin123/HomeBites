import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SectionTitle from '../../components/common/SectionTitle';
import Button from '../../components/ui/Button';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const role = searchParams.get('role') || 'customer';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const roleLabel = useMemo(() => (role === 'chef' ? 'Chef' : 'Customer'), [role]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!token) {
      setError('Reset token missing. Please open the link from your email again.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/v1/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, role, newPassword })
      });

      const payload = await response.json();
      if (!response.ok || !payload.success) {
        setError(payload.message || 'Could not reset password.');
        return;
      }

      setSuccess('Password updated successfully. Redirecting to login...');
      setTimeout(() => navigate(`/auth/${role}`), 1200);
    } catch {
      setError('Network error while resetting password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hb-page min-h-[calc(100vh-170px)]">
      <section className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 p-6 sm:p-8" data-reveal="enter">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-52 w-52 rounded-full bg-emerald-200/35 blur-3xl" />

        <div className="relative mx-auto max-w-lg">
          <article className="hb-surface rounded-2xl border border-orange-100 bg-white p-5">
            <SectionTitle
              eyebrow={`${roleLabel} Password Reset`}
              title="Create a new password"
              subtitle="Set a fresh password to continue securely into your HomeBites account."
            />

            <form className="mt-4 space-y-3" onSubmit={submit}>
              <input
                required
                minLength={6}
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                className="hb-input"
              />

              <input
                required
                minLength={6}
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="hb-input"
              />

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
              {success ? <p className="text-sm font-medium text-emerald-700">{success}</p> : null}

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={loading}>
                {loading ? 'Updating password...' : 'Update Password'}
              </Button>
            </form>
          </article>
        </div>
      </section>
    </main>
  );
}

export default ResetPasswordPage;
