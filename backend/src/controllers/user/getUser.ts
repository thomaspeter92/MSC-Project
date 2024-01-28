import prisma from "../../db/prisma";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('HELLOOOO')
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    });
    if (!user) return next(new ErrorResponse(404, 11, "No user found"));
    respond(res, 'Success', user)
  } catch (error) {
    next(error)
  }
}

export default getUser