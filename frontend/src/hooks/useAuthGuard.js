import { useMemo } from 'react';
import { useSessionStore } from '../app/store';

export function useAuthGuard() {
  const { user, role } = useSessionStore();

  return useMemo(
    () => ({
      isAuthenticated: Boolean(user),
      isChef: role === 'chef',
      isCustomer: role === 'customer'
    }),
    [user, role]
  );
}
