import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  refreshToken: null,

  setTokens: (accessToken, refreshToken) =>
    set({ token: accessToken, refreshToken }),
}));

export default useAuthStore;
