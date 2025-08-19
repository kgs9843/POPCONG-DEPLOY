import { create } from "zustand";

const userInfoStore = create((set) => ({
  id: null,
  host: false,
  name: "홍길동",

  setId: (id) => set({ id }),
  setHost: (host) => set({ host }),
  setName: (name) => set({ name }),

  // 전체 userInfo 한번에 바꾸고 싶을 때
  setUserInfo: (info) => set(info),
}));

export default userInfoStore;
