import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
import firebaseService from "../../lib/firebase/firebaseService";
import userDb from "../../db/userDb";
import messagesDb from "../../db/messagesDb";
import respond from "../../utils/response";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    const fbUser = await firebaseService.verifyToken(token ? token : "");

    // get the user id
    const dbUser = await userDb.getUserByEmail(fbUser.email as string);

    // get list of conversations form the db
    const conversations = await messagesDb.getAllConversations({
      user_id: dbUser.id,
    });

    respond(res, "Success", conversations);
  } catch (error) {
    next(error);
  }
};

export default getMessages;
