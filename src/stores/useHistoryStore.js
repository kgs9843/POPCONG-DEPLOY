import { create } from "zustand";

const useHistoryStore = create((set) => ({
  // 예약 내역
  reservationHistory: [],

  // 진행중 내역
  ongoingHistory: [],

  // 완료 내역
  completedHistory: [],

  // 추가 (예: 예약 추가)
  addReservation: (item) =>
    set((state) => ({
      reservationHistory: [...state.reservationHistory, item],
    })),

  // 상태 이동 (예약 → 진행중)
  moveToOngoing: (id) =>
    set((state) => {
      const item = state.reservationHistory.find((r) => r.id === id);
      return {
        reservationHistory: state.reservationHistory.filter((r) => r.id !== id),
        ongoingHistory: [
          ...state.ongoingHistory,
          { ...item, status: "ongoing" },
        ],
      };
    }),

  // 상태 이동 (진행중 → 완료)
  completeReservation: (id) =>
    set((state) => {
      const item = state.ongoingHistory.find((r) => r.id === id);
      return {
        ongoingHistory: state.ongoingHistory.filter((r) => r.id !== id),
        completedHistory: [
          ...state.completedHistory,
          { ...item, status: "completed" },
        ],
      };
    }),
}));

export default useHistoryStore;
