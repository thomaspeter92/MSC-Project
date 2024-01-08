import { Request, Response, NextFunction } from "express";
import { Sex } from "@prisma/client";
import prisma from "../../db/prisma";
import firebaseService from "../../lib/firebase/firebaseService";
import respond from "../../utils/response";
import ErrorResponse from "../../utils/errorResponse";
import { supabase } from "../../lib/supabase/supabaseInit";
import { getBearerToken } from "../../utils/getBearerToken";


type UpdateProfileRequestBody = {
  
};

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
    const profilePicture = ''
    const { data, error } = await supabase
      .storage
      .from('gallery')
      .upload(`${user.uid}/profile.png`, profilePicture, {
        cacheControl: '3600',
        upsert: false
      })
    console.log(data)
    
    // Send success response.
    respond(res, "Picture posted", {})
  } catch (error) {
    next(error);
  }
};

export default updateUserProfile