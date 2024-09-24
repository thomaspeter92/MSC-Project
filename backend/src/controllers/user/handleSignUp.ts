import { Request, Response, NextFunction } from "express";
import respond from "../../utils/response";
import userDb from "../../db/userDb";
import { encryptString } from "../../utils/jwt";

type SignUpRequestBody = {
  email: string;
  age: string;
  password: string;
  first_name: string;
  last_name: string;
  sex: string;
  likes: string[];
  dislikes: string[];
};

const handleSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let dbUser = null;
    // validate inputs
    const user: SignUpRequestBody = req.body;

    // FIRST HANDLE PASSWORD HASH AND SAVE TO DB
    user.password = await encryptString(user.password);

    try {
      dbUser = await userDb.createUser(user);
      // move this into a another try catch and rollback the account creation if it fails.
      // await userDb.createUserProfile({
      //   id: dbUser.id,
      //   likes: user.likes,
      //   dislikes: user.dislikes,
      // });
    } catch (error) {
      throw error;
    }

    // Send success response.
    respond(res, "User signed up", {});
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default handleSignUp;
