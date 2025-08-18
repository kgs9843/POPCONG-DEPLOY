import { create } from "zustand";
// 실시간 알림용입니다!
export const chatAlert = create((set) => ({
  notice: false,
  setNotice: () => set((state) => ({ notice: !state.notice })),
}));

export const notificationAlert = create((set) => ({
  notice: false,
  setNotice: () => set((state) => ({ notice: !state.notice })),
}));
