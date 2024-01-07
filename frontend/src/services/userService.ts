import api from "./api";

export const signIn = () => {
  return api.post("/user/signin", {});
};

export const getAllUsers = () => {
  return api.get('/user/all')
}

export const getUserProfile = (id: string) => {
  return api.get('/user/profile/'+id)
}

export const getUser = async (email: string) => {
  return api.get('/user/'+email)
}