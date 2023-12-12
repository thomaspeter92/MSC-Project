import { create } from "zustand";
import { getUserToken, signIn } from "../services/firebaseService";

type UserStore = {
  signIn: (email: string, password: string) => void;
};

export const useUserStore = create<UserStore>()((set, get) => ({
  loggedIn: false,

  signIn: async (email: string, password: string) => {
    try {
      await signIn(email, password);
      let token = await getUserToken();
      console.log(token);
    } catch (error) {}
  },
}));
