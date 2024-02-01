import { Response, Request, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import prisma from "../../db/prisma";
import respond from "../../utils/response";

const getRecentConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");

    let data = await prisma.user.findMany({
      where: { email: fbUser.email },
      select: {
        init_connections: {
          where: {
            status: "active",
          },
          select: {
            target: {
              select: {
                first_name: true,
                picture: true,
                id: true,
              },
            },
          },
        },
        target_connections: {
          where: {
            status: "active",
          },
          select: {
            initiator: {
              select: {
                first_name: true,
                picture: true,
                id: true,
              },
            },
          },
        },
      },
    });

    let connections: {
      id: number;
      first_name: string;
      picture: string | null;
    }[] = [];

    data[0]?.init_connections?.forEach((d) => {
      connections.push(d.target);
    });
    data[0]?.target_connections?.forEach((d) => {
      connections.push(d.initiator);
    });

    respond(res, "success", connections);
  } catch (error) {
    next(error);
  }
};

export default getRecentConnections;
