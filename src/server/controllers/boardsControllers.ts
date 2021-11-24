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
  const image = req.file;
  try {
    const newBoard = await Board.create({
      ...req.body,
      logo: image.fileURL,
      posts: [],
    });
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

const deleteBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: boardId } = req.params;
    const boardDeleted = await Board.findByIdAndDelete(boardId);
    if (!boardDeleted) {
      const error = new OwnError("This board does not exist in our database");
      error.code = 401;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { boards: boardId } }
      );
      res.json(boardDeleted);
    }
  } catch {
    const error = new OwnError("It was not possible to delete the board");
    error.code = 400;
    next(error);
  }
};

export { createBoard, deleteBoard };
