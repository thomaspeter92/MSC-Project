import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { userRouter } from "./routes/user";
import { connectionsRouter } from "./routes/connections";
import logger from "pino-http";
import errorHandler from "./middleware/error";
import axios from "axios";

// Load env variables
dotenv.config({ path: "../config/config.env" });

const app: Application = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
// app.use(logger());

// MOUNT ROUTERS
app.use("/api/v1/user", userRouter);
// connections
app.use("/api/v1/connections", connectionsRouter)

// auth
// chat

// SECOND MIDDLEWARE
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

/*
TO-DO:

AUTH:
  - login 
  - signup
  - add last active to DB
  - integrate google login

  USER:
    - edit profile
    - 

  CONNECTIONS:
    - add
    - block
    - 






*/
