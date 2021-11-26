import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import { NextFunction, Response } from "express";
import RequestAuth from "../utils/RequestAuth";
import Paper from "../../database/models/paper";
import { Board } from "../../database/models/board";
import { OwnError } from "./usersController";

const debug = log("own:paperscontroller");

dotenv.config();

const createPaper = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const image = req.file ? req.file : { fileURL: "" };
  const { idBoard } = req.params;
  try {
    const newPaper = await Paper.create({
      ...req.body,
      images: image.fileURL,
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

const deletePaper = (req: RequestAuth, res: Response, next: NextFunction) => {};
const updatePaper = (req: RequestAuth, res: Response, next: NextFunction) => {};

export { createPaper, deletePaper, updatePaper };
