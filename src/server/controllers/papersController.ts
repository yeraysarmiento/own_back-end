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
    const { idPaper } = req.params;

    const paperDeleted = await Paper.findByIdAndDelete(idPaper);
    if (!paperDeleted) {
      const error = new OwnError("This paper does not exist in our database");
      error.code = 404;
      next(error);
    } else {
      await Board.findOneAndUpdate(
        { papers: idPaper },
        { $pull: { papers: idPaper } }
      );
      res.json(paperDeleted);
    }
  } catch {
    const error = new OwnError("It was not possible to delete the paper");
    error.code = 400;
    next(error);
  }
};

const updatePaper = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idPaper } = req.params;
  const paper = req.body;

  if (req.images) {
    req.body.images = req.images;
  }

  try {
    const updatedPaper = await Paper.findByIdAndUpdate(idPaper, paper, {
      new: true,
    });
    if (updatedPaper) {
      res.json(updatedPaper);
    } else {
      const error = new OwnError("It was not possible to find the paper");
      error.code = 400;
      next(error);
    }
  } catch {
    const error = new OwnError("It was not possible to modify the paper");
    error.code = 400;
    next(error);
  }
};

const getPaginatedPapers = async (req: RequestAuth, res: Response) => {
  const page = +req.query.page;
  const limit = +req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const papers = req.body;

  const paperList = papers.slice(startIndex, endIndex);

  if (paperList.length === 0) {
    res.json([]);
  } else {
    res.status(200);
    res.json(paperList);
  }
};

const filterPapers = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const filterBy: any = req.query.filterby;
    const filterWith: any = req.query.filter;

    const { idBoard } = req.params;
    const board = await Board.findById(idBoard).populate("papers");

    const { papers } = board;
    const papersList = papers.filter((paper) => paper[filterBy] === filterWith);

    req.body = papersList;

    next();
  } catch {
    const error = new OwnError("Filtration not possible");
    error.code = 400;
    next(error);
  }
};

export {
  createPaper,
  deletePaper,
  updatePaper,
  getPaginatedPapers,
  filterPapers,
};
