import { create } from 'zustand';

export const useChatStore = create((set: any, get: any) => ({
  unreadChats: {},
  addToUnread: (message_id: string) =>
    set((state: any) => {
      return {
        unreadChats: {
          ...state.unreadChats,
          [message_id]: true,
        },
      };
    }),

  markChatAsRead: (message_id: number) =>
    set((state: any) => ({
      unreadChats: {
        ...state.unreadChats,
        [message_id]: false,
      },
    })),
}));
