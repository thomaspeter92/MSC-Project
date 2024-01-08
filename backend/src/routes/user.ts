import { Router } from "express";
import userController from "../controllers/user";

export const userRouter: Router = Router();

userRouter.get("/all", userController.getAllUsers);

userRouter.get('/:email', userController.getUser)

// get user profile
userRouter.get('/profile/:id', userController.getUserProfileById)

// create user
userRouter.post('/signup', userController.handleSignUp)

// sign in
userRouter.post('/signin',userController.handleSignIn)

// edit user
userRouter.post('/updateUser',userController.updateUserProfile)
