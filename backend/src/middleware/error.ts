import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const errorHandler = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse;

  // Send the error to client
  res.status(error?.statusCode || 500).json({
    errorCode: error?.errorCode || 500,
    message: error?.message || "Something went wrong",
  });
};

export default errorHandler;
