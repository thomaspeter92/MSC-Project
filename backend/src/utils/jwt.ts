import * as bcrypt from "bcrypt";

/**
 * Encrypts a string using bcrypt hashing
 */
export const encryptString = async (s: string): Promise<string> => {
  const encryptedString = await bcrypt.hash(s, 8);
  return encryptedString;
};

/**
 * Compares a plain string with a bcrypt hash to check they match
 */
export const bcryptCompare = async (
  s: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(s, hash);
};

export const SERVER_CONST = {
  JWTSECRET: "SecretKeyOfPMS-SECRET",
  ACCESS_TOKEN_EXPIRY_TIME_SECONDS: 1 * 8 * 60 * 60, // 8 hours
  REFRESH_TOKEN_EXPIRY_TIME_SECONDS: 5 * 7 * 24 * 60 * 60, // 1 week
};
