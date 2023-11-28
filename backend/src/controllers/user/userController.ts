import { NextFunction, Request, Response } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import firebaseService from "../../lib/firebase/firebaseService";
import { Sex } from "@prisma/client";
import { UserRecord } from "firebase-admin/lib/auth/user-record";

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
    let fbUser = null;
    let dbUser = null;
  
    // validate inputs
    const requestBody: SignUpRequestBody = req.body

    try {
      // post to firebase
      fbUser = await firebaseService.createUser({email: requestBody.email, password: requestBody.password});
    } catch (error) {
      throw error
    }

    try {
      // post to db
      dbUser = await prisma.user.create({
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
    } catch (error) {
      // roll back firebase if db failed
      await firebaseService.deleteUser(fbUser!.uid)
      throw error
    }
    // Send success response.
    res.status(200).json({
      success: true,
      message: "User successfully signed up"
    });    
  } catch (error) {
    next(error);
  }
};
