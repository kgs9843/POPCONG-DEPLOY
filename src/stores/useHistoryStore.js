import { create } from "zustand";

const useHistoryStore = create((set) => ({
  // 예약 내역
  reservationHistory: 2,

  // 진행중 내역
  ongoingHistory: 0,

  // 완료 내역
  completedHistory: 0,

  // 예약 추가 (+1)
  addReservation: () =>
    set((state) => ({
      reservationHistory: state.reservationHistory + 1,
    })),
  reverseAddReservation: () =>
    set((state) => ({
      reservationHistory: state.reservationHistory - 1,
    })),

  // 예약 → 진행중 (+1)
  moveToOngoing: () =>
    set((state) => ({
      ongoingHistory: state.ongoingHistory + 1,
    })),

  // 진행중 → 완료 (+1)
  completeReservation: () =>
    set((state) => ({
      completedHistory: state.completedHistory + 1,
    })),
}));

export default useHistoryStore;
