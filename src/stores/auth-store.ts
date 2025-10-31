import { create } from "zustand";

type UserState = {
  id: string | null;
  email: string | null;
  nickname: string | null;
  profileImage: string | null;
  createdAt: string | null;
};

type UserAction = {
  setUser: (u: UserState) => void;
};

export const useUserInfoStore = create<UserState & UserAction>((set) => ({
  id: null,
  email: null,
  nickname: null,
  profileImage: null,
  createdAt: null,
  setUser: (u) => set(u),
}));

type AuthState = {
  isLogin: boolean;
  setIsLogin: (u: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  setIsLogin: (u) => set({ isLogin: u }),
}));
