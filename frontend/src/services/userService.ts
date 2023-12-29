import api from "./api";

export const signIn = () => {
  return api.post("/user/signin", {});
};
