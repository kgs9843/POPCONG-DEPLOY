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
      buildingImage:
        "data:image/jpeg;base64,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",
      timestamp: new Date(2024, 7, 15, 10, 20), // 정렬용 timestamp
    },
    {
      id: 11,
      name: "김지범",
      lastMessage: "네 내일 괜찮습니다.",
      time: "1시간 전",
      unreadCount: 0,
      profile: "https://via.placeholder.com/40",
      buildingImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsJqtCuzIbtWliiWhhyztlkQQbwRSbtTLp3w&s",
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
