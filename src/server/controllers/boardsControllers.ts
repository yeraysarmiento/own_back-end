import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import { Board } from "../../database/models/board";
import { User } from "../../database/models/user";
import { OwnError } from "./usersControllers";
import RequestAuth from "../utils/RequestAuth";

const debug = log("own:boardscontroller");

dotenv.config();

const createBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBoard = await Board.create({ ...req.body, posts: [] });
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { boards: newBoard.id } }
    );
    debug(chalk.green(`New board created ${req.username}`));
    res.json(newBoard);
  } catch {
    const error = new OwnError("Please, insert a valid board format");
    error.code = 400;
    next(error);
  }
};

// const deleteBoard = async (req: Request, res: Response, next: NextFunction) => {
//   const { id: boardId } = req.params;
//   const boardDeleted = await Board.findByIdAndDelete(boardId);
// };

export default createBoard;
