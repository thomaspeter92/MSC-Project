import { Request, Response, NextFunction, response } from "express";
import prisma from "../../db/prisma";
import respond from "../../utils/response";

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users = await prisma.user.findMany();

  respond(res, 'success', users)
};

export default getAllUsers