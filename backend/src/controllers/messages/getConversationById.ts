import { Request, Response, NextFunction } from "express";
import { getBearerToken } from "../../utils/getBearerToken";
import userDb from "../../db/userDb";
import messagesDb from "../../db/messagesDb";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";

const getConversationById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Verify the user
    const token = getBearerToken(req.headers.authorization || "");
    // const fbUser = await firebaseService.verifyToken(token ? token : "");

    // if (!fbUser) {
    //   next(new ErrorResponse(401, 11, "Unauthorised"))
    // }

    // get the consersation entry
    const conversation = await messagesDb.getConversationById(
      req.body.conversation_id
    );

    // get lthe full list of messaged for the conversation
    const messages = await messagesDb.getWholeConversationById(
      req.body.conversation_id
    );

    const data = {
      ...conversation,
      messages: messages,
    };

    respond(res, "Success", data);
  } catch (error) {
    next(error);
  }
};

export default getConversationById;
