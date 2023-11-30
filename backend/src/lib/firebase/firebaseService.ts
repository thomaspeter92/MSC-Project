import { User } from "@prisma/client";
import { firebaseAuth } from "./firebaseInit";
import firebase from "firebase-admin";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";

const createUser = async (
  user: firebase.auth.CreateRequest
): Promise<UserRecord> => {
  return await firebaseAuth.createUser(user);
};

const deleteUser = async (uid: string): Promise<void> => {
  return await firebaseAuth.deleteUser(uid);
};

const verifyToken = async (token: string): Promise<DecodedIdToken> => {
  return await firebaseAuth.verifyIdToken(token);
};

export default {
  createUser,
  deleteUser,
  verifyToken,
};
