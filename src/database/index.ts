import chalk from "chalk";
import mongoose from "mongoose";
import log from "debug";

const debug = log("own:database");

const initializeDB = (connectionString: string) =>
  new Promise<void>((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(connectionString, (error: { message: string }) => {
      if (error) {
        debug(chalk.red("Connection to the database not possible"));
        debug(chalk.red(error.message));
        reject(error);
      }
      debug(chalk.green("Connected to OWN database"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.green("Connection to database closed"));
    });
  });

export default initializeDB;
