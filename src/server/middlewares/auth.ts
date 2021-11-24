import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import OwnError from "../utils/OwnError";
import RequestAuth from "../utils/RequestAuth";

dotenv.config();

const auth = (req: RequestAuth, res: Response, next: NextFunction) => {
  const { authorization: authHeader }: any = req.headers;

  if (!authHeader) {
    const error = new OwnError("A token is needed to access");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new OwnError("A valid token is needed to access");
      error.code = 401;
      throw error;
    } else {
      try {
        const user: any = jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        next();
      } catch {
        const error = new OwnError("A not valid token has been introduced");
        error.code = 401;
        throw error;
      }
    }
  }
};

export default auth;
