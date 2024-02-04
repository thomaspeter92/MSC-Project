import { Request, Response, NextFunction } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import userDb from "../../db/userDb";


const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");


    // Decoded firebase token will hold user email, use this to find them from the db.
    const dbUser = await userDb.getUserByEmail(fbUser.email as string)
    if (!dbUser) return next(new ErrorResponse(401, 11, 'User not found in DB'))

    // if token is verified, get user data from the db and return it to the frontend, save in state/cookie/localstorage?
    // also update the last_active value in the db with now()

    respond(res, 'success', dbUser);
  } catch (error) {
    next(error);
  }
};

export default handleSignIn
