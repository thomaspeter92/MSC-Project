import { create } from "zustand";
import {
  getUserToken,
  signIn,
  signOutFirebase,
} from "../services/firebaseService";
import { signIn as userSignIn } from "../services/userService";

type UserStore = {
  signIn: (email: string, password: string) => void;
  loggedIn: boolean;
  loginFailed: boolean;
  user: any;
};

// const signIn = async () => {
//   let res = await signInWithEmailAndPassword(
//     auth,
//     "tomas@test.com",
//     "password123"
//   );
//   console.log(res);

//   let token = await res.user.getIdToken();

//   let r = await fetch("http://127.0.0.1:8080/api/v1/user/signin", {
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });
//   let data = await r.json();
//   setLoggedIn(true)
// };

export const useUserStore = create<UserStore>()((set, get) => ({
  loggedIn: true,
  loginFailed: false,
  user: {},

  signIn: async (email: string, password: string) => {
    try {
      await signIn(email, password);
      let res = await userSignIn();
      set({ user: res.data.data });
      set({ loggedIn: true, loginFailed: false });
    } catch (error) {
      set({ loggedIn: false, loginFailed: true });
    }
  },
  signOut: async () => {
    try {
      await signOutFirebase();
      set({ user: {}, loggedIn: false });
    } catch (error) {
      alert(error);
    }
  },
}));
