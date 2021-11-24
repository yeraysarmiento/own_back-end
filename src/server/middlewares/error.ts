import log from "debug";
// import chalk from "chalk";
import { Request, Response } from "express";

const debug = log("own:errors");
// const { ValidationError } = require("express-validation");

export const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint not found" });
};

export const generalErrorHandler = (
  error: {
    message?: string;
    code?: number;
  },
  req: Request,
  res: Response
) => {
  // if (error instanceof ValidationError) {
  //   error.code = 400;
  //   error.message = "Anonymous error in your schema";
  // }

  debug(`An error has been thrown: ${error.message}`);
  const message: string = error.code
    ? error.message
    : "Error: unable to specify";
  res.status(error.code || 500);
  res.json({ error: message });
};
