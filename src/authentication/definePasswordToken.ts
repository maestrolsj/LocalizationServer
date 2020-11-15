import jwt from "jsonwebtoken";

import { TokenPayload } from "./";

export const sign = (payload: TokenPayload) =>
  jwt.sign(payload, process.env.SET_PASSWORD_TOKEN_SECRET as string, {
    expiresIn: "12h",
  });

export const decode = (token: string) =>
  jwt.verify(
    token,
    process.env.SET_PASSWORD_TOKEN_SECRET as string
  ) as TokenPayload;
