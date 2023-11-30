import { NextFunction, Request } from "express";
import { getBearerToken } from "../utils/getBearerToken";
import firebaseService from "../lib/firebase/firebaseService";
import ErrorResponse from "../utils/errorResponse";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = getBearerToken(req?.headers?.authorization || "");
    let fbUser = await firebaseService.verifyToken(token);
    console.log(fbUser);
    req.params.uid = fbUser.uid;
    next();
  } catch (error) {
    next(new ErrorResponse(401, "User unauthorized"));
  }
};
