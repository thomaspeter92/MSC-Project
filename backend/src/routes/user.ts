import { Router } from "express";
import { getAllUsers, getUserById, handleSignUp } from "../controllers/user/userController";

export const userRouter: Router = Router();

userRouter.get("/all", getAllUsers);

// get user
userRouter.get('/:id', getUserById)

// create user
userRouter.post('/signup', handleSignUp)

// edit user

// delete user

// 
