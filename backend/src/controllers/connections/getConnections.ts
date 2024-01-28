import prisma from "../../db/prisma";
import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import pythonService from "../../services/pythonService";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";

const getConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    const user = await firebaseService.verifyToken(token ? token : "");


    // Decoded firebase token will hold user email, use this to find them from the db.
    const dbUser  = await prisma.user.findUnique({
      where: {
        email: user.email
      }
    })    
    if(!dbUser) return next(new ErrorResponse(401, 11, 'User not found in DB'))

    const userId = dbUser.id

    console.log(dbUser)

    const response = await pythonService.post('/getConnections', {
      "user_id": userId,
    })
    const user_ids = response.data
    console.log(response.data)

    const users = await prisma.user.findMany({
      where: {
        id: { in: user_ids},
      },
      select: {
        first_name: true,
        username: true,
        age: true,
        picture: true,
        Profile: {
          select: {
            location: true,
            bio: true,
            likes: true,
            dislikes: true
          }
        }
      }
    })
    const flattenedUsers = users.map(user => {
      // Assume there is always one profile per user
      const profile = user.Profile[0];
      // Create a new object with a flat structure
      return {
        ...user,
        ...profile,
      };
    })
    respond(res, 'Success', flattenedUsers)
  } catch (error) {
    next(error)
  }
}

export default getConnections