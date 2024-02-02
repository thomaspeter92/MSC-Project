import { Request, Response, NextFunction } from "express";
import { Sex } from "@prisma/client";
import prisma from "../../db/prisma";
import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";
import { supabase } from "../../lib/supabase/supabaseInit";
import { getBearerToken } from "../../utils/getBearerToken";

type UpdateProfileRequestBody = {};

const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // validate inputs
    const requestBody: UpdateProfileRequestBody = req.body;
    const token = getBearerToken(req.headers.authorization || "");
    const user = await firebaseService.verifyToken(token ? token : "");
    const profilePicture = req.file?.buffer;
    console.log(req.body);

    if (profilePicture) {
      const { error } = await supabase.storage
        .from("gallery")
        .upload(`${user.uid}/profile.png`, profilePicture, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        return next(new ErrorResponse(500, 50, "unable to upload image"));
      }
    }

    await prisma.user.update({
      data: {
        picture:
          "https://fxxqwotagugztamftphi.supabase.co/storage/v1/object/public/gallery/" +
          user.uid +
          "/profile.png",
      },
      where: {
        id: Number(req.body.id),
      },
    });

    // Send success response.
    respond(res, "Picture posted", {});
  } catch (error) {
    next(error);
  }
};

export default updateUserProfile;
