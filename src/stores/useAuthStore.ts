import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  userId: number;
  setUser: (id: number) => void;
}

const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    userId: 0,
    setUser: (userId) => set({ userId }),
  })),
);

export default useAuthStore;
