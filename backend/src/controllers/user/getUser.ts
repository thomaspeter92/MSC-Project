import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import userDb from "../../db/userDb";

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.params.email || null;

    if (!email) return next(new ErrorResponse(400, 40, "No email provided"));

    const user = await userDb.getUserByEmail(email);

    if (!user)
      res
        .status(404)
        .json({ statusCode: 404, status: "error", message: "No user found" });
    respond(res, "Success", user);
  } catch (error) {
    next(error);
  }
};

export default getUser;
