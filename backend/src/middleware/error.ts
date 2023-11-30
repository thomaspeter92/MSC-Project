import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../utils/errorResponse";
import { FirebaseError } from "firebase-admin";
import { firebaseErrors } from "../lib/firebase/firebaseErrors";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const errorHandler = (
  err: ErrorResponse & FirebaseError,
  req: Request,
  res: Response
) => {
  let error: ErrorResponse;

  // Check if FIREBASE ERROR.
  if (err.code in firebaseErrors) {
    let message =
      firebaseErrors[err.code as keyof typeof firebaseErrors].message ||
      "An error occured.";
    let statusCode =
      firebaseErrors[err.code as keyof typeof firebaseErrors].statusCode || 500;
    error = new ErrorResponse(statusCode, message);
  } else if (err instanceof PrismaClientValidationError) {
    let message = "Invalid inputs";
    let statusCode = 415;
    error = new ErrorResponse(statusCode, message);
  } else {
    error = err;
  }
  // Send the error to client
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong",
  });
};

export default errorHandler;
