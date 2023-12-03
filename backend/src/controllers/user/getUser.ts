import { Request,Response, NextFunction } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!user) return next(new ErrorResponse(404, 11, "No user found"));

    respond(res, 'Success', user)
  } catch (error) {
    next(error);
  }
};

export default getUserById
