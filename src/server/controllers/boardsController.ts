/* eslint-disable no-underscore-dangle */
import { NextFunction, Response } from "express";
import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import { Board } from "../../database/models/board";
import { User } from "../../database/models/user";
import { OwnError } from "./usersController";
import RequestAuth from "../utils/RequestAuth";
import Paper from "../../database/models/paper";

const debug = log("own:boardscontroller");

dotenv.config();

Paper.find();

const getBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idBoard } = req.params;

  try {
    const filledBoard = await Board.findById(idBoard).populate("papers");
    if (filledBoard) {
      res.status(200);
      res.json(filledBoard);
    } else {
      const error = new OwnError("Board not found in our server");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.message = "Not possible to get the board";
    error.code = 401;
    next(error);
  }
};

const createBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBoard = await Board.create({
      ...req.body,
      logo: req.images[0]
        ? req.images[0]
        : "https://firebasestorage.googleapis.com/v0/b/own-api-2c648.appspot.com/o/assets%2Fnoimage.png?alt=media&token=98e7984a-6913-4c3e-ad48-74975dbd43c4",
    });
    await User.findOneAndUpdate(
      { _id: req.userId },
      { $push: { boards: newBoard.id } }
    );
    debug(chalk.green(`New board created in user: ${req.username}`));
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
    const { idBoard } = req.params;

    const boardDeleted = await Board.findByIdAndDelete(idBoard);
    if (!boardDeleted) {
      const error = new OwnError("This board does not exist in our database");
      error.code = 404;
      next(error);
    } else {
      await User.findByIdAndUpdate(
        { _id: req.userId },
        { $pull: { boards: idBoard } }
      );
      res.json(boardDeleted);
    }
  } catch {
    const error = new OwnError("It was not possible to delete the board");
    error.code = 400;
    next(error);
  }
};

const updateBoard = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idBoard } = req.params;
  const board = req.body;
  if (req.images) {
    [req.body.logo] = req.images;
  }

  try {
    const updatedBoard = await Board.findByIdAndUpdate(idBoard, board, {
      new: true,
    });
    if (updatedBoard) {
      res.json(updatedBoard);
    } else {
      const error = new OwnError("It was not possible to find the board");
      error.code = 400;
      next(error);
    }
  } catch {
    const error = new OwnError("It was not possible to modify the board");
    error.code = 400;
    next(error);
  }
};

export { getBoard, createBoard, deleteBoard, updateBoard };
