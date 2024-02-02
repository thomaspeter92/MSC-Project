import prisma from "../../db/prisma";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import pythonService from "../../services/pythonService";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import userDb from "../../db/userDb";

const getConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");

    // Decoded firebase token will hold user email, use this to find them from the db.
    const dbUser = await userDb.getUserByEmail(fbUser.email as string);
    if (!dbUser)
      return next(new ErrorResponse(401, 11, "User not found in DB"));

    const userId = dbUser.id;

    // Send Req to Python service
    const response = await pythonService.post("/getConnections", {
      user_id: userId,
    });
    const user_ids = response.data;

    const users = await userDb.getListOfUsers(user_ids);

    respond(res, "Success", users);
  } catch (error) {
    next(error);
  }
};

export default getConnections;
