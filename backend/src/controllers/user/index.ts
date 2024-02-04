import getAllUsers from "./getAllUsers";
import getUserProfileById from "./getUserProfile";
import handleSignIn from "./handleSignIn";
import handleSignUp from "./handleSignUp";
import getUser from "./getUser";
import updateProfilePicture from "./uploadProfilePicture";

const userController = {
  getAllUsers,
  getUserProfileById,
  handleSignIn,
  handleSignUp,
  getUser,
  updateProfilePicture,
};

export default userController;
