import { Router } from "express";
import connectionsController from "../controllers/connections";
import { authorize } from "../utils/authUtil";

export const connectionsRouter: Router = Router();

// maybe change this to getRecommendations?
connectionsRouter.get(
  "/getConnections",
  authorize,
  connectionsController.getConnections
);

connectionsRouter.post(
  "/makeConnection",
  authorize,
  connectionsController.makeConnection
);

// list recent connections
connectionsRouter.get(
  "/getConnectionsList",
  authorize,
  connectionsController.getConnectionsList
);

// handle connection (approve/decline)
