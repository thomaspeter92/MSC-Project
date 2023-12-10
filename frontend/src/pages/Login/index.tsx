import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../App"

type Props = {}

const Login = ({}: Props) => {


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
    setLoggedIn(true)
  };
  return (
    <div>Login</div>
  )
}

export default Login