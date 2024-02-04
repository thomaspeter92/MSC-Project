import { Request, Response, NextFunction } from "express";
import { Sex } from "@prisma/client";
import prisma from "../../db/prisma";
import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";
import userDb from "../../db/userDb";
import { supabase } from "../../lib/supabase/supabaseInit";

type SignUpRequestBody = {
  email: string;
  age: string;
  password: string;
  first_name: string;
  last_name: string;
  sex: Sex;
  likes: string[];
  dislikes: string[];
};

const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let fbUser = null;
    let dbUser = null;
    const profilePicture = req?.file?.buffer

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
      dbUser = await userDb.createUser(requestBody)
      console.log(dbUser)

      // move this into a another try catch and rollback the account creation if it fails.
      await userDb.createUserProfile({ id: dbUser.id, likes: requestBody.likes, dislikes: requestBody.dislikes })
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
    console.log(error)
    next(error);
  }
};

export default handleSignUp