import { Response, Request, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import userDb from "../../db/userDb";
import ErrorResponse from "../../utils/errorResponse";
import connectionsDb from "../../db/connectionsDb";
const getConnectionsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");

    const limit = Number(req.query.limit);

    const dbConnections = await connectionsDb.getConnections(
      Number(req.user.userId),
      limit
    );

    respond(res, "success", dbConnections);
  } catch (error) {
    next(error);
  }
};

export default getConnectionsList;
