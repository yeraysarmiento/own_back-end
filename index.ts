import dotenv from "dotenv";

import initializeDB from "./database";
import initializeServer from "./server/index";

dotenv.config();

const port = process.env.PORT ?? process.env.OWN_PORT ?? 4500;

(async () => {
  try {
    await initializeDB(process.env.OWN_DB);
    initializeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
