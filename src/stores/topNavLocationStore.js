import { create } from "zustand";
// 상단바의 동, 위도, 경도 저장용 입니다!
const topNavLocationStore = create((set) => ({
  latitude: null,
  longitude: null,
  dong: null,
  setLocation: (lat, lng, dong) => set({ latitude: lat, longitude: lng, dong }),
}));

export default topNavLocationStore;
