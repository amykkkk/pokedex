import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<UserStore>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
