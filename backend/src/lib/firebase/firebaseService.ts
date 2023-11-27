import { firebaseAuth } from "./firebaseInit";
import firebase from "firebase-admin";

const createUser = async (user: firebase.auth.CreateRequest) => {
  return await firebaseAuth.createUser(user);
};

export default {
  createUser,
};
