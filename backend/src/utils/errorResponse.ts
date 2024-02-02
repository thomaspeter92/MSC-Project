const errors = {
  // track all the errors/codes here
  1: "unauthorized",

  11: "no user found",

  20: "existing connection",

  40: "missing params",

  50: "upload failed",
};

class ErrorResponse extends Error {
  statusCode: number; //for the http status.
  errorCode: number; // for front end error mapping.
  constructor(statusCode: number, errorCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export default ErrorResponse;
