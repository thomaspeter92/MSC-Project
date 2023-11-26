import * as firebase from 'firebase-admin'
const firebaseCredentials = require('../../../config/msc-project-7e88b-firebase-adminsdk-mkuve-9a48e37e4e.json')

const firebaseApp: firebase.app.App = firebase.initializeApp({
  credential: firebase.credential.cert(firebaseCredentials)
})

export const firebaseAuth: firebase.auth.Auth = firebaseApp.auth();
