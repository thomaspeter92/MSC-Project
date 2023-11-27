export const firebaseErrors: { [key: string]: {statusCode: number, message: string}} = {
  "auth/email-already-exists": { 
    statusCode: 409, 
    message: "This email address is already registered." 
  }
}