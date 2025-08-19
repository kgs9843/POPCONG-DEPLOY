import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("access_token") || null,
  setToken: (token) => set({ token }),
}));

export default useAuthStore;
