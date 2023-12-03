class ErrorResponse extends Error {
  statusCode: number; //for the http status.
  errorCode: number; // for front end error mapping.
  constructor(statusCode: number, errorCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}

export default ErrorResponse