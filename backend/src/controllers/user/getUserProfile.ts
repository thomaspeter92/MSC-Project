import { Request,Response, NextFunction } from "express";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";

const getUserProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.params.id)
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    if (!user) return next(new ErrorResponse(404, 11, "No user found"));
    const profile = await prisma.profile.findUnique({
      where: {
        user_id: Number(req.params.id)
      }
    })
    if (!profile) return next(new ErrorResponse(404, 11, "No user found"));

    respond(res, 'Success', {...user, ...profile})
  } catch (error) {
    next(error);
  }
};

export default getUserProfileById