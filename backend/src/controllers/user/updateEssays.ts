import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import userDb from "../../db/userDb";
import respond from "../../utils/response";

const updateEssays = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const token = getBearerToken(req.headers.authorization || "");
    // const fbUser = await firebaseService.verifyToken(token ? token : "");
    // const requestBody = req.body;
    // let dbUser = await userDb.getUserByEmail(fbUser.email as string);
    // if (dbUser) {
    //   await userDb.updateEssays({ ...requestBody, id: dbUser.id });
    // }
    // // Check if all the about info is complete, then change user table to 'complete'
    // // let unfinished = await userDb.getUnfinishedProfile(dbUser.id);
    // // if (!unfinished) {
    // //   // update user table to complete
    // //   await userDb.updateUserComplete(dbUser.id);
    // // }
    // respond(res, "Success", []);
  } catch (error) {
    next(error);
  }
};

export default updateEssays;
