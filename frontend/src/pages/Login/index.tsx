import GoogleButton from "../../components/googleButton";
import TextInput from "../../components/textInput";
import { useUserStore } from "../../stores/userStore";
import Button from "../../components/button";
import { useFormik } from "formik";
import { signInValidator } from "../../lib/validations/userValidation";

type Props = {};

const Login = ({ }: Props) => {
  const [signIn, loginFailed] = useUserStore((state) => [
    state.signIn,
    state.loginFailed,
  ]);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInValidator,
    onSubmit: ({ email, password }) => signIn(email, password),
  });



  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-5 rounded-lg w-[450px] max-w-full space-y-5 shadow-main"
      >
        <h1>Sign In</h1>
        <GoogleButton />
        <hr />
        <TextInput
          icon="mail"
          placeholder="Email Address"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <TextInput
          icon="lock"
          name="password"
          placeholder="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        <Button size="lg" className="w-full" type="submit">Sign In</Button>
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
