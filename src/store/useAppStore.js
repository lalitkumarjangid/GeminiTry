import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      chatrooms: [],
      messages: {},
      isDarkMode: false,

      login: (userData) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null }),

      addChatroom: (chatroom) => set((state) => ({
        chatrooms: [...state.chatrooms, chatroom],
        messages: { ...state.messages, [chatroom.id]: [] },
      })),
      deleteChatroom: (id) => set((state) => ({
        chatrooms: state.chatrooms.filter((room) => room.id !== id),
        messages: Object.fromEntries(
          Object.entries(state.messages).filter(([key]) => key !== id)
        ),
      })),
      addMessage: (chatroomId, message) => set((state) => ({
        messages: {
          ...state.messages,
          [chatroomId]: [...(state.messages[chatroomId] || []), message],
        },
      })),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'gemini-chat-storage', // unique name
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        chatrooms: state.chatrooms,
        messages: state.messages,
        isDarkMode: state.isDarkMode,
      }),
    }
  )
);

export default useAppStore;