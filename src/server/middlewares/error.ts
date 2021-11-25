import log from "debug";
import chalk from "chalk";
import { Request, Response } from "express";
import { ValidationError } from "express-validation";

const debug = log("own:errors");

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
  if (error instanceof ValidationError) {
    debug(chalk.red("A not valid format request has been sent"));
    error.message = "Not valid request";
  }

  debug(chalk.red(`An error has been thrown: ${error.message}`));
  const message = error.message || "Error: unable to specify";
  res.status(error.code || 500);
  res.json({ error: message });
};

export { notFoundErrorHandler, generalErrorHandler };
