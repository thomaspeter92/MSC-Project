import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import logger from "pino-http";
import prisma from "./db/prisma";

// Load env variables
dotenv.config({ path: "./config/config.env" });

const app: Application = express();

// MIDDLEWARE
app.use(cors());
app.use(logger());
// MOUNT ROUTERS
app.use("/api/v1/user", userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
