import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/errorResponse";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import userDb from "../../db/userDb";

const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // FIND USER FROM DB (EMAIL),
    const dbUser = await userDb.getUserByEmail(req.body.email as string);
    if (!dbUser)
      return next(new ErrorResponse(401, 11, "User not found in DB"));

    // VALIDATE PASSWORD HASH.

    // RETURN THE TOKEN

    respond(res, "success", dbUser);
  } catch (error) {
    next(error);
  }
};

export default handleSignIn;
