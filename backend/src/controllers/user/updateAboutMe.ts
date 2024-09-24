import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import userDb from "../../db/userDb";
import respond from "../../utils/response";

const updateAboutMe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestBody = req.body;

    if (req.user.email !== requestBody.email) {
      res
        .status(401)
        .json({ statusCode: 401, status: "error", message: "Not permitted" });
    }

    // first confirm the user exsits in the DB
    const dbUser = await userDb.getUserByEmail(req.user.email as string);
    if (dbUser) {
      const updatedUser = await userDb.updateAboutInfo({
        ...requestBody,
        id: dbUser.id,
      });

      // Check if all the about info is complete, then change user table to 'complete'
      let unfinished = await userDb.getUnfinishedProfile(dbUser.id);
      if (!unfinished) {
        // update user table to complete
        await userDb.updateUserComplete(dbUser.id);
      }
      respond(res, "Success", updatedUser);
    }
  } catch (error) {
    next(error);
  }
};

export default updateAboutMe;
