import { create } from 'zustand';

export const useChatStore = create((set: any, get: any) => ({
  chats: {},
  unreadChats: new Set(), // Track chats with unread messages
  addMessageToChat: (chatId: number, message: string) =>
    set((state: any) => {
      const isNewMessage = !state.chats[chatId]; // Simplified check
      return {
        chats: {
          ...state.chats,
          [chatId]: [...(state.chats[chatId] || []), message],
        },
        unreadChats: isNewMessage ? state.unreadChats.add(chatId) : state.unreadChats,
      };
    }),
  markChatAsRead: (chatId: number) =>
    set((state: any) => ({
      unreadChats: new Set([...state.unreadChats].filter((id) => id !== chatId)), // Remove chatId from unreadChats
    })),
  setActiveChat: (chatId: number, messages: any[]) =>
    set((state: any) => ({
      chats: {
        ...state.chats,
        [chatId]: messages, // Initialize or reset the chat with a set of messages
      },
    })),
  getChatById: (chatId: number) => get().chats[chatId], // Utility to get chat by ID
}));
