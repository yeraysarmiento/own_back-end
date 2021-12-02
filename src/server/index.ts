import express from "express";
import log from "debug";
import cors from "cors";
import morgan from "morgan";
import chalk from "chalk";
import { generalErrorHandler, notFoundErrorHandler } from "./middlewares/error";
import usersRoutes from "./routes/usersRoutes";
import boardsRoutes from "./routes/boardsRoutes";
import papersRoutes from "./routes/papersRoutes";
import auth from "./middlewares/auth";

const debug = log("own:server");

const app = express();

const initializeServer = (port: number) =>
  new Promise((resolve) => {
    const server = app.listen(port, () => {
      debug(chalk.green(`Connected to port ${port}`));
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

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/user", usersRoutes);
app.use("/board", boardsRoutes);
app.use("/paper", auth, papersRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

export { initializeServer, app };
