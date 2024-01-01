import api from "./api";

export const signIn = () => {
  return api.post("/user/signin", {});
};


export const getAllUsers = () => {
  return api.get('/user/all')
}