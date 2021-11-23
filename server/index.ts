import * as dotenv from "dotenv";
import * as express from "express";
import log from "debug";
import * as morgan from "morgan";
import * as chalk from "chalk";
import * as cors from "cors";

dotenv.config();

const debug = log("own:server");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const initializeServer = (port: number) =>
  new Promise((resolve) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`connecting to ${port}`));
      resolve(server);
    });

    server.on("error", (error: { code: string }) => {
      debug(chalk.red("Error initializing Server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} is already in use.`));
      }

      debug(chalk.red(error.code));
    });

    server.on("close", () => {
      debug(chalk.blue("See you soon"));
    });
  });

export default initializeServer;
