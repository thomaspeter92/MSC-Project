import { Request, Response, NextFunction } from "express"
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import prisma from "../../db/prisma";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";



const makeConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const targetId = req.body.id
    if (!targetId) return next(new ErrorResponse(400, 11, "No id provided"));

    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");

    // get id of user
    const initiator = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
      select: {
        id: true
      }
    });
    if (!initiator) return next(new ErrorResponse(404, 11, "No target user found"));
    // validate target exists
    const targetUser = await prisma.user.findUnique({
      where: {
        id: req.body.id,
      }
    });

    if (!targetUser) return next(new ErrorResponse(404, 11, "No target user found"));

    // Check for existing connection
    const prevConnection = await prisma.connections.findFirst({
      where: {
        OR: [
          { initiator_id: initiator.id, target_id: targetId },
          { initiator_id: targetId, target_id: initiator.id },
        ],
      },
    });

    if (prevConnection) {
      return next(new ErrorResponse(400, 12, "Connection already exists"));
    }

    // create new connection with 'pending'
    const newConnection = await prisma.connections.create({
      data: {
        initiator_id: initiator.id,
        target_id: targetId,
        status: "pending", // Assuming you have a status field
      },
    });


    // return success
    respond(res, 'Connection successful', newConnection)


  } catch (error) {
    next(error)
  }
}

export default makeConnection