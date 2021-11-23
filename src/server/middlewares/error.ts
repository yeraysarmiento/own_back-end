import log from "debug";
import * as chalk from "chalk";
import { Request, Response } from "express";

const debug = log("own:errors");
// const { ValidationError } = require("express-validation");

export const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint not found" });
};

export const generalErrorHandler = (
  error: { message?: string; code?: number },
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

export const notIdFoundHandler = (
  req: Request,
  res: { json: (string) => void; status: number }
) => {
  debug(chalk.red(`A nonexisting ID has been requested`));
  res.status = 401;
  res.json({ error: "This ID has not been found" });
};

export const notAllowedHandler = (req, res) => {
  debug(chalk.red(`A not allowed user tried to access to editing mode`));
  res.status(404).json({ error: "You are not allowed" });
};
