import { Request, Response, NextFunction } from "express";
import { Sex } from "@prisma/client";
import prisma from "../../db/prisma";
import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";

type SignUpRequestBody = {
  email: string;
  age: string;
  password: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  username: string;
};

const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let fbUser = null;
    let dbUser = null;

    // validate inputs
    const requestBody: SignUpRequestBody = req.body;

    try {
      // post to firebase
      fbUser = await firebaseService.createUser({
        email: requestBody.email,
        password: requestBody.password,
      });
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
          verified: false,
        },
      });
    } catch (error) {
      // roll back firebase if db failed
      // if the rollback fails, how to handle it?
      // MAYBE: allow user to log in but then transfer them to a complete account page where they'll be required to fill in
      // the missing details and repost to the DB???
      await firebaseService.deleteUser(fbUser!.uid);
      throw error;
    }
    // Send success response.
    respond(res, "User signed up", {})
  } catch (error) {
    console.log('ERRRRRRRRRROR')
    next(error);
  }
};

export default handleSignUp