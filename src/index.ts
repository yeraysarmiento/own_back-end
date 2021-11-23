/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import initializeDB from "./database";
import initializeServer from "./server/index";

const port = process.env.PORT ?? process.env.OWN_PORT ?? 4500;

(async () => {
  try {
    await initializeDB(process.env.OWN_DB);
    initializeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
