import * as dotenv from "dotenv";

dotenv.config();
// eslint-disable-next-line import/first
import initializeServer from "./server";

const port = process.env.PORT ?? process.env.OWN_PORT ?? 4500;

(async () => {
  try {
    initializeServer(+port);
  } catch (error) {
    process.exit(1);
  }
})();
