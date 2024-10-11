import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
// import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import userDb from "../../db/userDb";
import connectionsDb from "../../db/connectionsDb";

const makeConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statuses = ["pending", "blocked"];
    const targetId = Number(req.body.id);
    const status = req.body.status;

    if (!targetId || !status || !statuses.includes(status))
      return next(new ErrorResponse(400, 40, "No id or status provided"));

    const initiator = await userDb.getUserByEmail(req.user.email as string);
    if (!initiator)
      return next(new ErrorResponse(404, 11, "No initiator provided"));

    // validate target exists
    const targetUser = await userDb.getUserById(targetId);
    if (!targetUser)
      return next(new ErrorResponse(404, 11, "No target user found"));

    // Check for existing connection
    const prevConnection = await connectionsDb.checkConnection(
      initiator.id,
      targetId
    );

    if (prevConnection?.length > 0) {
      return next(new ErrorResponse(400, 20, "Connection already exists"));
    }

    // create new connection with 'pending'
    const newConnection = await connectionsDb.createConnection(
      initiator.id,
      targetId,
      status // can be block or request
    );
    respond(res, "Connection successful", newConnection);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default makeConnection;
