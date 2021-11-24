import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import OwnError from "../utils/OwnError";
import RequestAuth from "../utils/RequestAuth";

dotenv.config();

const auth = async (req: RequestAuth, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    const error = new OwnError("A token is needed to access");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];

    if (!token) {
      const error = new OwnError("A valid token is needed to access");
      error.code = 401;
      next(error);
    } else {
      try {
        const user = await jwt.verify(token, process.env.SECRET);
        req.userId = user.id;
        req.username = user.username;
        next();
      } catch {
        const error = new OwnError("A not valid token has been introduced");
        // error.message = "A not valid token has been introduced";
        error.code = 401;
        next(error);
      }
    }
  }
};

export default auth;
