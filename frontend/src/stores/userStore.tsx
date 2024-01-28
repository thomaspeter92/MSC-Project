import { create } from "zustand";
import { signIn, signOutFirebase } from "../services/firebaseService";
import { getUser, signIn as userSignIn } from "../services/userService";
import { onAuthStateChanged } from "../services/firebaseService";

type UserStore = {
  signIn: (email: string, password: string) => void;
  loggedIn: boolean;
  loginFailed: boolean;
  loading: boolean;
  user: any;
  signOut: () => void;
};

onAuthStateChanged(async (user: any) => {
  if (user) {
    try {
      let res: any = await getUser(user.email as string);
      console.log(res)
      if (res.data) {
        useUserStore.setState({
          user: res.data,
          loggedIn: true,
          loading: false,
        });
      } else {
        useUserStore.setState({ user: null, loggedIn: false, loading: false });
      }
    } catch (error) {
      console.log('hello')
      useUserStore.setState({ user: null, loggedIn: false, loading: false });
    }
  } else {
    useUserStore.setState({ user: null, loggedIn: false, loading: false });
  }
});

export const useUserStore = create<UserStore>()((set) => ({
  loggedIn: false,
  loading: true,
  loginFailed: false,
  user: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true });
    try {
      await signIn(email, password);
      let res = await userSignIn();
      set({ user: res.data });
      set({ loggedIn: true, loginFailed: false, loading: false });
    } catch (error) {
      set({ loggedIn: false, loginFailed: true, loading: false });
    }
  },
  signOut: async () => {
    try {
      await signOutFirebase();
      set({ user: null, loggedIn: false });
    } catch (error) {
      alert(error);
    }
  },
}));
