import { Router } from "express";
import { getAllUsers } from "../controllers/user/getAllUsers";

export const userRouter: Router = Router();

userRouter.get("/", getAllUsers);
