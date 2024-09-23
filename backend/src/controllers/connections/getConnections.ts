import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import { getBearerToken } from "../../utils/getBearerToken";
import userDb from "../../db/userDb";

const getConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");

    // DECRYPT & VERIFY TOKEN
    // const fbUser = await firebaseService.verifyToken(token ? token : "");

    // Decoded firebase token will hold user email, use this to find them from the db.
    // const dbUser = await userDb.getUserByEmail(fbUser.email as string);
    // if (!dbUser)
    //   return next(new ErrorResponse(401, 11, "User not found in DB"));

    // const userId = dbUser.id;

    // CHANGE HERE. USED TO USE PYTHON SERVICE, CHANGE TO GAB FIRST 10 ACCOUNTS THAT SATISFY FILTER OR SOMETHING
    // const users = await userDb.getListOfUsers();

    // respond(res, "Success", users);
  } catch (error) {
    next(error);
  }
};

export default getConnections;
