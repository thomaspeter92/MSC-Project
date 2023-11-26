import { NextFunction,Request, Response } from "express"
import ErrorResponse from "../utils/errorResponse"

const errorHandler = (err: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message)
  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}

export default errorHandler