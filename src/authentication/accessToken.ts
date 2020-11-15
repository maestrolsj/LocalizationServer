import jwt from "jsonwebtoken";

import { TokenPayload } from "./";

export const sign = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "4h",
  });

export const decode = (token: string) =>
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as TokenPayload;
