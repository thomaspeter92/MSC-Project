import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { SERVER_CONST } from "./jwt";
import userDb from "../db/userDb";

export const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get access token from req header
  const token = req.headers?.authorization
    ? (req.headers?.authorization?.split("Bearer ")[1] as string)
    : null;
  console.log(token);

  //   Return 401 error if token is missing
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: "error",
      message: "Missing auth token",
    });
  }

  //   IF the token is present
  try {
    // Verify token
    // verify access token
    const decodedToken = jwt.verify(token, SERVER_CONST.JWTSECRET);
    req.user = {};
    req.user.username = decodedToken["username"] ?? "";
    req.user.email = decodedToken["email"] ?? "";

    if (req.user?.email) {
      const dbUser = await userDb.getUserByEmail(req.user.email);
      req.user.userId = dbUser?.id;
    }
    next();
    // Get user from db
  } catch (error) {
    console.error(error.message);
    return res
      .status(401)
      .json({ statusCode: 401, status: "error", message: "Invalid Token" });
  }
};
