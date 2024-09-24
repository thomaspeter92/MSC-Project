import { Request, Response, NextFunction, response } from "express";

import respond from "../../utils/response";
import userDb from "../../db/userDb";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users: any = [];
  console.log("users");

  try {
    const users = await userDb.getAllUsers();
    console.log(users);
    respond(res, "success", users);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: "something went wrong",
    });
  }
};

export default getAllUsers;
