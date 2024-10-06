import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../../utils/errorResponse";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import userDb from "../../db/userDb";
import { bcryptCompare } from "../../utils/jwt";
import * as jwt from "jsonwebtoken";
import { SERVER_CONST } from "../../utils/jwt";

const handleSignIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("REQUEST");

    const { email, password } = req.body;
    console.log(email, password);

    // FIND USER FROM DB (EMAIL),
    const dbUser = await userDb.getUserByEmail(email as string);
    if (!dbUser)
      return next(new ErrorResponse(404, 11, "User not found in DB"));

    console.log(dbUser);

    // VALIDATE PASSWORD HASH.
    const passwordsMatch = bcryptCompare(password, dbUser.password);
    if (!passwordsMatch)
      return next(new ErrorResponse(400, 11, "Unauthorized"));

    // GENERATE ACCESS TOKEN
    // Generate access and refresh token
    const accessToken: string = jwt.sign(
      { email: dbUser.email, username: dbUser.username },
      SERVER_CONST.JWTSECRET,
      { expiresIn: SERVER_CONST.ACCESS_TOKEN_EXPIRY_TIME_SECONDS }
    );

    // RETURN THE TOKEN

    respond(res, "success", accessToken);
  } catch (error) {
    next(error);
  }
};

export default handleSignIn;
