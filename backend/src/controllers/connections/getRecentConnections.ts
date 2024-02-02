import { Response, Request, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import prisma from "../../db/prisma";
import respond from "../../utils/response";
import userDb from "../../db/userDb";
import ErrorResponse from "../../utils/errorResponse";
import connectionsDb from "../../db/connectionsDb";
const getRecentConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");

    if (!fbUser) return next(new ErrorResponse(404, 11, "No user found"));

    const dbUser = await userDb.getUserByEmail(fbUser.email as string);
    const dbConnections = await connectionsDb.getConnections(dbUser.id, 10);

    respond(res, "success", dbConnections);
  } catch (error) {
    next(error);
  }
};

export default getRecentConnections;
