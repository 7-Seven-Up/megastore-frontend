import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthResponse } from "@auth/interfaces/responses/auth.interface.ts";

type Store = {
  authResponse?: AuthResponse;
  isAuthenticated: boolean;
  setAuthResponse: (authResponse: AuthResponse) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
  login: (authResponse: AuthResponse) => void;
};

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      authResponse: undefined,
      isAuthenticated: false,
      setAuthResponse: (authResponse: AuthResponse) => {
        set({ authResponse });
      },
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({ isAuthenticated });
      },
      logout: () => {
        set({ authResponse: undefined, isAuthenticated: false });
      },
      login: (authResponse) => {
        set({ isAuthenticated: true, authResponse });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
