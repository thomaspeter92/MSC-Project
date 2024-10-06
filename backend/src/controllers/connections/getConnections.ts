import { NextFunction, Request, Response } from "express";
import ErrorResponse from "../../utils/errorResponse";
import respond from "../../utils/response";
import { getBearerToken } from "../../utils/getBearerToken";
import userDb from "../../db/userDb";
import connectionsDb from "../../db/connectionsDb";

const getConnections = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // get user from req
    const { user } = req || null;

    const dbUser = await userDb.getUserByEmail(user.email as string);
    if (!dbUser)
      return next(new ErrorResponse(401, 11, "User not found in DB"));

    const { sex, orientation } = dbUser;

    let sexToSearch, orientationToSearch;
    if (dbUser.sex === "m") {
      if (dbUser.orientation === "gay") {
        sexToSearch = "m";
        orientationToSearch = "gay";
      } else {
        sexToSearch = "f";
        orientationToSearch = "straight";
      }
    } else if (dbUser.sex === "f") {
      if (dbUser.orientation === "gay") {
        sexToSearch = "f";
        orientationToSearch = "gay";
      } else {
        sexToSearch = "m";
        orientationToSearch = "straight";
      }
    }

    const recommendations = await connectionsDb.getRecommendations(
      user.userId,
      sexToSearch,
      orientationToSearch
    );

    // Remove password from response
    recommendations.forEach((d) => delete d.password);

    respond(res, "Success", recommendations);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default getConnections;
