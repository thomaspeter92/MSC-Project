declare namespace Express {
  interface Request {
    user?: {
      username?: string;
      email?: string;
      userId?: string;
    };

    // Add other properties needed
  }
}
