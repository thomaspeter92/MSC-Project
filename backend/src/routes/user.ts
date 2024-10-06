import { Router } from "express";
import userController from "../controllers/user";
import multer from "multer";
import { authorize } from "../utils/authUtil";

const upload = multer();
/**
 * TODO:
 *  - ADD VALIDATION MIDDLEWARE TO ROUTES
 */

export const userRouter: Router = Router();

// create user
userRouter.post("/signup", userController.handleSignUp);

// sign in
userRouter.post("/signin", userController.handleSignIn);

userRouter.get("/all", authorize, userController.getAllUsers);

userRouter.get("/:email", authorize, userController.getUser);

// get user profile
userRouter.get("/profile/:id?", authorize, userController.getUserProfileById);

// edit user
userRouter.post(
  "/updatePicture",
  authorize,
  upload.single("image"),
  userController.updateProfilePicture
);

userRouter.post("/updateAboutInfo", authorize, userController.updateAboutMe);

userRouter.post("/updateEssays", authorize, userController.updateEssays);
