import { NextFunction, Request } from "express";
import { getBearerToken } from "../utils/getBearerToken";
import ErrorResponse from "../utils/errorResponse";

/**
 * REPLACE THIS WITH CUSTOM JWT IMPLEMENTATION
 */

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = getBearerToken(req?.headers?.authorization || "");
    // let fbUser = await firebaseService.verifyToken(token);
    // req.params.uid = fbUser.uid;
    next();
  } catch (error) {
    next(new ErrorResponse(401, 1, "User unauthorized"));
  }
};
