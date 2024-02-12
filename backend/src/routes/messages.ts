import { Router } from "express";
import messagesController from "../controllers/messages";


export const messagesRouter: Router = Router();


messagesRouter.post("/sendMessage", messagesController.sendMessage);


// Get a list of all my recent conversations
messagesRouter.get("/getMessages", messagesController.getMessages);


// Get a list of all my recent conversations
messagesRouter.post("/getConversationById", messagesController.getConversationById);