import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBQffvOFjHcu7KLv-QIEt7ucRaLt6mGoS0",
  authDomain: "msc-project-7e88b.firebaseapp.com",
  projectId: "msc-project-7e88b",
  storageBucket: "msc-project-7e88b.appspot.com",
  messagingSenderId: "55806778480",
  appId: "1:55806778480:web:d5713c07024ba430f4a8b5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const signIn = async () => {
    let res = await signInWithEmailAndPassword(
      auth,
      "tomas@test.com",
      "password123"
    );
    console.log(res);

    let token = await res.user.getIdToken();

    let r = await fetch("http://127.0.0.1:8080/api/v1/user/signin", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    let data = await r.json();
    console.log(data);
  };

  return <div onClick={signIn}>Application</div>;
}

export default App;
