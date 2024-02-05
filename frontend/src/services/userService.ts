import { SignUpForm } from "../pages/Signup";
import api from './api';

export const signIn = () => {
  return api.post('/user/signin', {});
};

export const signUp = (body: {}) => {
  return api.post('/user/signup', body)
}

export const getAllUsers = () => {
  return api.get('/user/all');
};

export const getUserProfile = (id: string) => {
  return api.get('/user/profile/' + id);
};

export const getUser = async (email: string) => {
  return api.get('/user/' + email);
};

export const updateProfilePicture = async (body: any) => {
  return api.post('/user/updatePicture', body);
};

export const updateAboutInfo = async (body: any) => {
  return api.post('/user/updateAboutInfo', body)
}