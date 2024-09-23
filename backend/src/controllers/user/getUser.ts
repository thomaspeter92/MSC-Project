import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import userDb from "../../db/userDb";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email || null;
    if (!email) return next(new ErrorResponse(400, 40, "No email provided"));
    const user = await userDb.getUserByEmail(email);
    if (!user) return next(new ErrorResponse(404, 11, "No user found"));
    respond(res, "Success", user);
  } catch (error) {
    next(error);
  }
};

export default getUser;
