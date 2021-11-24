import log from "debug";
import chalk from "chalk";
import { Request, Response } from "express";

const debug = log("own:errors");
// const { ValidationError } = require("express-validation");

const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint not found" });
};

const generalErrorHandler = (
  error: {
    message?: string;
    code?: number;
  },
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: any
) => {
  // if (error instanceof ValidationError) {
  //   error.code = 400;
  //   error.message = "Anonymous error in your schema";
  // }

  debug(chalk.red(`An error has been thrown: ${error.message}`));
  const message: string = error.code
    ? error.message
    : "Error: unable to specify";
  res.status(error.code || 500);
  res.json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
