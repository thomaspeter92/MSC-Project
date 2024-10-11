import { Request, Response, NextFunction } from "express";
// import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import userDb from "../../db/userDb";

const getUserProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("HAHAHAHA");

    const id = Number(req.params.id) || Number(req.user.userId);

    console.log(id);

    const user = await userDb.getUserProfile(id);

    console.log(user);

    if (!user) return next(new ErrorResponse(404, 11, "No user found"));

    delete user.password;

    respond(res, "Success", user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getUserProfileById;
