import { NextFunction, Response } from "express";
import { User } from "../../database/models/user";
import OwnError from "../utils/OwnError";
import RequestAuth from "../utils/RequestAuth";

const authentication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { id: boardId } = req.params;
  const user = await User.findOne({ id: req.userId });
  if (user.boards.includes(boardId)) {
    next();
  } else {
    const error = new OwnError("You are not allowed to edit");
    error.code = 400;
    next(error);
  }
};

export default authentication;
