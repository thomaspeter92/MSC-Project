import { Router } from "express";
import connectionsController from "../controllers/connections";

export const connectionsRouter: Router = Router();

connectionsRouter.get("/getConnections", connectionsController.getConnections);

connectionsRouter.post("/makeConnection", connectionsController.makeConnection)
