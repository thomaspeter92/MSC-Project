import ErrorResponse from "./errorResponse";

export const getBearerToken = (header: string) => {
  try {
    let token = header.replace("Bearer ", "");
    if (token) return token;
    throw new ErrorResponse(401, 1, "No token provided");
  } catch (error) {
    throw error;
  }
};
