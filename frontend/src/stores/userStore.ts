import { create } from 'zustand';
import { signIn as userSignIn } from '../services/userService';
import { persist } from 'zustand/middleware';

type UserStore = {
  signIn: (email: string, password: string) => void;
  loggedIn: boolean;
  loginFailed: boolean;
  loading: boolean;
  user: any;
  signOut: () => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      loggedIn: false,
      loading: false,
      loginFailed: false,
      user: null,

      signIn: async (email: string, password: string) => {
        set({ loading: true });
        try {
          let res = await userSignIn(email, password);
          set({ user: res.data });
          set({ loggedIn: true, loginFailed: false, loading: false });
        } catch (error) {
          set({ loggedIn: false, loginFailed: true, loading: false });
        }
      },
      setUser: (data: any) => {
        set({ user: data });
      },
      signOut: async () => {
        try {
          set({ user: null, loggedIn: false });
        } catch (error) {
          alert(error);
        }
      },
    }),
    {
      name: 'user-store',
    }
  )
);
