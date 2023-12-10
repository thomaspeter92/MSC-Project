import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";
import { initializeApp } from "firebase/app";
import AuthRouter from "./routers/authRouter";
import { useState } from "react";
import AppRouter from "./routers/appRouter";
const firebaseConfig = {
  apiKey: "AIzaSyBQffvOFjHcu7KLv-QIEt7ucRaLt6mGoS0",
  authDomain: "msc-project-7e88b.firebaseapp.com",
  projectId: "msc-project-7e88b",
  storageBucket: "msc-project-7e88b.appspot.com",
  messagingSenderId: "55806778480",
  appId: "1:55806778480:web:d5713c07024ba430f4a8b5",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  // This should be a global state (zustand)
  const [loggedIn, setLoggedIn] = useState<boolean>()

  if(loggedIn) {
    <AppRouter />
  } else {
    return (
      <AuthRouter />
    )
  }
}

export default App;
