import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
// import firebaseService from "../../lib/firebase/firebaseService";
import userDb from "../../db/userDb";
import messagesDb from "../../db/messagesDb";
import respond from "../../utils/response";

const initChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    // const fbUser = await firebaseService.verifyToken(token ? token : "");

    // get the user id
    // const dbUser = await userDb.getUserByEmail(fbUser.email as string)

    //  Ensure users are connected

    // check conversation exists
    // let conversationId = await messagesDb.checkCoversationExists({ sender_id: dbUser.id, recipient_id: req.body.recipient_id })

    // // if not create it
    // if (!conversationId) {
    //   conversationId = await messagesDb.createConversation({ sender_id: dbUser.id, recipient_id: req.body.recipient_id })
    // }

    // respond(res, "Success", { conversationId })
  } catch (error) {
    next(error);
  }
};

export default initChat;
