export const firebaseErrors: { [key: string]: {statusCode: number, message: string, errorCode: number}} = {
  "auth/email-already-exists": { 
    statusCode: 409, 
    errorCode: 1,
    message: "This email address is already registered." 
  }
}