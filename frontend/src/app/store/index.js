import { create } from 'zustand';

export const useSessionStore = create((set) => ({
  user: null,
  role: null,
  token: null,
  setSession: (payload) => set(payload),
  clearSession: () => set({ user: null, role: null, token: null })
}));
