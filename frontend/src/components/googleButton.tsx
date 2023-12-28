import IMAGES from "../assets/images/images";

type Props = {};

const GoogleButton = ({}: Props) => {
  return (
    <button
      type="button"
      className="w-full border-2 rounded font-bold text-sky-500 border-sky-500 py-2 flex justify-center items-center gap-2"
    >
      <img className="w-5" src={IMAGES.googleLogo}></img>
      Sign In with Google
    </button>
  );
};

export default GoogleButton;
