import { firebaseAuth } from "./firebaseInit";
import firebase from 'firebase-admin'

const createUser = async (user: firebase.auth.CreateRequest) => {
  return await firebaseAuth.createUser({email: 'tomas@test.com', password: 'password123!', displayName: 'tomastest'})
}


export default {
  createUser,
  
}