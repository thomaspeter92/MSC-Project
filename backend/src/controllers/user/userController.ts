import { NextFunction, Request, Response } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import firebaseService from "../../lib/firebase/firebaseService";
import { Sex } from "@prisma/client";

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
    next();
  }
};

type SignUpRequestBody = {
  email: string;
  age: string;
  password: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  username: string;
}

export const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body)
    // validate inputs
    const requestBody: SignUpRequestBody = req.body

    // post to firebase
    let fbUser = await firebaseService.createUser({email: requestBody.email, password: requestBody.password});

    // post to db
    let dbUser = await prisma.user.create({
      data: {
        email: requestBody.email,
        first_name: requestBody.first_name,
        last_name: requestBody.last_name,
        age: Number(requestBody.age),
        sex: requestBody.sex,
        username: requestBody.username,
        verified: false
      }
    })
    // Send success response.
    res.status(200).json({
      success: true,
      message: "User successfully signed up"
    });
    // roll back firebase if db fails
  } catch (error) {
    next(error);
  }
};
