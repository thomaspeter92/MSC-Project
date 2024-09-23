import { Request, Response, NextFunction, response } from "express";

import respond from "../../utils/response";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users: any = [];

  respond(res, "success", users);
};

export default getAllUsers;
