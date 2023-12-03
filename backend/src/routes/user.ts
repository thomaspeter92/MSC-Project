import { Router } from "express";
import userController from "../controllers/user";

export const userRouter: Router = Router();

userRouter.get("/all", (req,res,next) => userController.getAllUsers(req,res,next));

// get user
userRouter.get('/:id', userController.getUserById)

// create user
userRouter.post('/signup', userController.handleSignUp)

// sign in
userRouter.post('/signin',userController.handleSignIn)

// edit user

// delete user

// 
