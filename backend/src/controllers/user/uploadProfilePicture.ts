import { Request, Response, NextFunction } from "express";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";
import { supabase } from "../../lib/supabase/supabaseInit";
import userDb from "../../db/userDb";

type UpdateProfileRequestBody = {
  email: string;
};

const uploadProfilePicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate inputs
    const requestBody: UpdateProfileRequestBody = req.body;
    const email = requestBody?.email;
    const profilePicture = req.file?.buffer;

    let dbUser = await userDb.getUserByEmail(email);

    if (profilePicture) {
      const { error } = await supabase.storage
        .from("gallery")
        .upload(`${dbUser.id}/profile.png`, profilePicture, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        return next(new ErrorResponse(500, 50, "unable to upload image"));
      }
      await userDb.insertPicture({
        link:
          "https://fxxqwotagugztamftphi.supabase.co/storage/v1/object/public/gallery/" +
          dbUser.id +
          "/profile.png",
        user_id: dbUser.id,
      });
    }

    // Send success response.
    respond(res, "Picture posted", {});
  } catch (error) {
    next(error);
  }
};

export default uploadProfilePicture;
