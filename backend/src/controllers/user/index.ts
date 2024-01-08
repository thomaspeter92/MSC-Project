import getAllUsers from "./getAllUsers";
import getUserProfileById from "./getUserProfile";
import handleSignIn from "./handleSignIn";
import handleSignUp from "./handleSignUp";
import getUser from './getUser'
import updateUserProfile from "./updateUserProfile";

const userController = {
  getAllUsers,
  getUserProfileById,
  handleSignIn,
  handleSignUp,
  getUser,
  updateUserProfile
}

export default userController