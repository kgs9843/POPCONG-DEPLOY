import { create } from "zustand";

export const useChatStore = create((set) => ({
  chats: [
    {
      id: 10,
      name: "김태민",
      lastMessage: "네 그럼 오늘 6시에 뵙겠습니다.",
      time: "방금 전",
      unreadCount: 1,
      profile: "https://via.placeholder.com/40",
      buildingImage: "https://via.placeholder.com/50",
      timestamp: new Date(2024, 7, 15, 10, 20), // 정렬용 timestamp
    },
    {
      id: 11,
      name: "김지범",
      lastMessage: "네 내일 괜찮습니다.",
      time: "1시간 전",
      unreadCount: 0,
      profile: "https://via.placeholder.com/40",
      buildingImage: "https://via.placeholder.com/50",
      timestamp: new Date(2024, 7, 15, 9, 10),
    },
  ],
  setChats: (newChats) => set({ chats: newChats }),
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  updateChat: (id, updated) =>
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, ...updated } : c)),
    })),
  removeChat: (id) =>
    set((state) => ({
      chats: state.chats.filter((c) => c.id !== id),
    })),
  // 읽지 않은 메시지 카운트 초기화 (id 기준)
  setUnreadCount: (id) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id && chat.unreadCount !== 0
          ? { ...chat, unreadCount: 0 }
          : chat
      ),
    })),
}));
