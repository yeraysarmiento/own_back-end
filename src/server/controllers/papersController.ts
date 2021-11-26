import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import { NextFunction, Response } from "express";
import RequestAuth from "../utils/RequestAuth";
import Paper from "../../database/models/paper";
import { Board } from "../../database/models/board";
import { OwnError } from "./usersController";
import { User } from "../../database/models/user";

const debug = log("own:paperscontroller");

dotenv.config();

const createPaper = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idBoard } = req.params;
  try {
    const newPaper = await Paper.create({
      ...req.body,
      images: req.images,
    });
    await Board.findOneAndUpdate(
      { _id: idBoard },
      { $push: { papers: newPaper.id } }
    );
    debug(chalk.green(`New paper created in board: ${idBoard}`));
    res.json(newPaper);
  } catch {
    const error = new OwnError("Please, insert a valid paper format");
    error.code = 400;
    next(error);
  }
};

const deletePaper = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: paperId } = req.params;

    const paperDeleted = await Paper.findByIdAndDelete(paperId);
    if (!paperDeleted) {
      const error = new OwnError("This paper does not exist in our database");
      error.code = 404;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { papers: paperId } }
      );
      res.json(paperDeleted);
    }
  } catch {
    const error = new OwnError("It was not possible to delete the paper");
    error.code = 400;
    next(error);
  }
};

const updatePaper = (req: RequestAuth, res: Response, next: NextFunction) => {};

export { createPaper, deletePaper, updatePaper };
