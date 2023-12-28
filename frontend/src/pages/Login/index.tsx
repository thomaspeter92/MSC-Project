import GoogleButton from "../../components/googleButton";
import TextInput from "../../components/textInput";
import { useUserStore } from "../../stores/userStore";
import Button from "../../components/button";

type Props = {};

const Login = ({}: Props) => {
  const [signIn] = useUserStore((state) => [state.signIn]);

  // const signIn = async () => {
  //   let res = await signInWithEmailAndPassword(
  //     auth,
  //     "tomas@test.com",
  //     "password123"
  //   );
  //   console.log(res);

  //   let token = await res.user.getIdToken();

  //   let r = await fetch("http://127.0.0.1:8080/api/v1/user/signin", {
  //     method: "POST",
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   let data = await r.json();
  //   setLoggedIn(true)
  // };
  return (
    <div className="h-full flex items-center justify-center">
      <form className="bg-white p-5 rounded-lg w-[450px] max-w-full space-y-5 shadow-main">
        <h1>Sign In</h1>
        <GoogleButton />
        <hr />
        <TextInput
          placeholder="Email Address"
          type="email"
          onChange={() => null}
        />
        <TextInput
          placeholder="Password"
          type="password"
          onChange={() => null}
        />
        <Button>Sign In</Button>
        <hr />
        <p className="text-center">
          Don't have an account yet?{" "}
          <a className="font-bold text-rose-400" href="/signup">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
