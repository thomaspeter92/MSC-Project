import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import { FirebaseError } from "firebase-admin";
import { firebaseErrors } from "../lib/firebase/firebaseErrors";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const errorHandler = (
  err: ErrorResponse & FirebaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse;

  // Check if FIREBASE ERROR.
  if (err.code in firebaseErrors) {
    let fbError = firebaseErrors[err.code as keyof typeof firebaseErrors];
    error = new ErrorResponse(
      fbError.statusCode || 500,
      fbError.errorCode || 500,
      fbError.message || "Something went wrong"
    );
  } else if (err instanceof PrismaClientValidationError) {
    let message = "Invalid inputs";
    let statusCode = 415;
    let errorCode = 40;
    error = new ErrorResponse(statusCode, errorCode, message);
  } else {
    error = err;
  }

  // Send the error to client
  res.status(error.statusCode || 500).json({
    errorCode: error.errorCode || 500,
    message: error.message || "Something went wrong",
  });
};

export default errorHandler;
