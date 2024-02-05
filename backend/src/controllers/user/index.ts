import getAllUsers from "./getAllUsers";
import getUserProfileById from "./getUserProfile";
import handleSignIn from "./handleSignIn";
import handleSignUp from "./handleSignUp";
import getUser from "./getUser";
import updateProfilePicture from "./uploadProfilePicture";
import updateAboutMe from "./updateAboutMe";

const userController = {
  getAllUsers,
  getUserProfileById,
  handleSignIn,
  handleSignUp,
  getUser,
  updateProfilePicture,
  updateAboutMe
};

export default userController;
