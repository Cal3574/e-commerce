const jwt = require("jsonwebtoken");
require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/errorClasses";

export function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
          console.log("fail2");

          throw new AuthenticationError("User is not authenticated", 401);
        }
        //@ts-ignore
        req.user = { id: user.userId, email: user.email };
      });

      console.log("next");
      next();
    } else {
      throw new AuthenticationError("User is not authenticated", 401);
    }
  } catch (e) {
    next(e);
  }
}
