import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { connectionsRouter } from "./routes/connections";
import errorHandler from "./middleware/error";
import { messagesRouter } from "./routes/messages";
import { createServer } from "http";
import { initSocketServer } from "./lib/socketIo/connectionHandler";

// Load env variables
dotenv.config({ path: "../config/config.env" });

const app: Application = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// MOUNT ROUTERS
app.use("/api/v1/user", userRouter);
app.use("/api/v1/connections", connectionsRouter);
// app.use('/api/v1/messages', messagesRouter)

// SECOND MIDDLEWARE (must be mounted after the routers)
app.use(errorHandler);

// Create HTTP server (needed for use with sockets)
const httpServer = createServer(app);

// Init sockets
initSocketServer(httpServer);

const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
