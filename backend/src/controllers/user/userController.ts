import { NextFunction, Request, Response } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import firebaseService from "../../lib/firebase/firebaseService";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!user) return next(new ErrorResponse(404, "No user found"));
    res.status(200).send(user);
  } catch (error) {
    next(new ErrorResponse(404, "User not found"));
  }
};

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let fb = await firebaseService.createUser({ email: "tomas@test.com" });
    console.log(res);

    res.status(200).json({});
  } catch (error) {
    console.log(error);
    next(new ErrorResponse(500, "Firebase Failed"));
  }
};
