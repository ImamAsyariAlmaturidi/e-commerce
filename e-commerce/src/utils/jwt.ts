import jwt, { JwtPayload } from "jsonwebtoken";
const SECRET_KEY: string = process.env.SECRET_KEY || "habhdbahbd";
export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, SECRET_KEY);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY);
};
