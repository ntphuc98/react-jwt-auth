import { Response } from "express";

export const verifyToken = (
  authHeader: string,
  type: "accessToken" | "refreshToken",
  res: Response
) => {
  const jwtToken = authHeader.split(" ")?.[1];
  if (!jwtToken) return res.sendStatus(401); // unauthorized
  return;
};
