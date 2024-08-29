import jwt, { JwtPayload } from "jsonwebtoken";
import * as jose from "jose";
const SECRET_KEY: string = process.env.SECRET_KEY || "habhdbahbd";
export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET_KEY);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
