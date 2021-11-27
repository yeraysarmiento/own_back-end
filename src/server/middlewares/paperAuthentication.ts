import { NextFunction, Response } from "express";
import { User } from "../../database/models/user";
import OwnError from "../utils/OwnError";
import RequestAuth from "../utils/RequestAuth";

const paperAuthentication = async (
  req: RequestAuth,
  res: Response,
  next: NextFunction
) => {
  const { idPaper } = req.params;
  try {
    const user = await (
      await User.findOne({ _id: req.userId })
    ).populate({
      path: "boards",
      select: "papers",
    });

    if (
      user.boards
        .map((board: any) => board.papers.includes(idPaper))
        .includes(true)
    ) {
      next();
    } else {
      const error = new OwnError("You are not allowed to edit");
      error.code = 403;
      next(error);
    }
  } catch {
    const error = new OwnError(
      "There has been an issue with your authentication"
    );
    error.code = 404;
    next(error);
  }
};

export default paperAuthentication;
