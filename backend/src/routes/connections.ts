import { Router } from "express";
import connectionsController from "../controllers/connections";

export const connectionsRouter: Router = Router();

// maybe change this to getRecommendations?
connectionsRouter.get("/getConnections", connectionsController.getConnections);

connectionsRouter.post("/makeConnection", connectionsController.makeConnection);

// list recent connections
connectionsRouter.get(
  "/getConnectionsList",
  connectionsController.getConnectionsList
);

// handle connection (approve/decline)
