import { create } from 'zustand';

type ChatStore = {
  unreadChats: { [key: number]: boolean };
  addToUnread: (message_id: string) => void;
  markChatAsRead: (message_id: string) => void;
};

export const useChatStore = create<ChatStore>((set) => ({
  unreadChats: {},
  addToUnread: (message_id) =>
    set((state: any) => {
      return {
        unreadChats: {
          ...state.unreadChats,
          [message_id]: true,
        },
      };
    }),

  markChatAsRead: (message_id) =>
    set((state: any) => ({
      unreadChats: {
        ...state.unreadChats,
        [message_id]: false,
      },
    })),
}));
