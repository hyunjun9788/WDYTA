import { create } from 'zustand';

interface AuthState {
  userId: number;
  setUser: (id: number) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  userId: 0,
  setUser: (userId) => set({ userId }),
}));

export default useAuthStore;
