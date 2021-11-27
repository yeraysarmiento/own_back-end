import dotenv from "dotenv";
import log from "debug";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import supertest from "supertest";
import chalk from "chalk";
import initializeDB from "../../database";
import { User } from "../../database/models/user";
import { initializeServer, app } from "../index";

dotenv.config();

const debug = log("own:userroutes:tests");

const request = supertest(app);
let server;

beforeAll(async () => {
  await initializeDB(process.env.OWN_DB_TEST);
  server = await initializeServer(+process.env.OWN_PORT_TEST);
});

beforeEach(async () => {
  await User.deleteMany();
  await User.create({
    email: "loling@loling.com",
    username: "loling",
    password: await bcrypt.hash("loling", 10),
    boards: [],
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.green("test: DB Connection running"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("test: DB Connection ended"));
  });
  await server.close();
});

describe("Given a /login endpoint", () => {
  describe("When a POST request arrives with a not registered username and password", () => {
    test("Then it should respond with a 401 error", async () => {
      const { body } = await request
        .post("/user/login")
        .send({ username: "Lola", password: "Lola" })
        .expect(401);

      const expectedError = {
        error: "Wrong credentials",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When a POST request arrives with a registered username and password", () => {
    test("Then it should respond with a 200 and an object in the body with a token property", async () => {
      const { body } = await request
        .post("/user/login")
        .send({
          username: "loling",
          password: "loling",
        })
        .expect(200);

      expect(body).toHaveProperty("user");
    });
  });
});
describe("Given a /register endpoint", () => {
  describe("When a POST request arrives with an already existing username", () => {
    test("Then it should respond with a 400 code error", async () => {
      const { body } = await request
        .post("/user/register")
        .send({
          username: "loling",
          password: "loling",
          email: "loling@loling.com",
        })
        .expect(400);

      const expectedError = {
        error: "Username already taken",
      };

      expect(body).toEqual(expectedError);
    });
  });
  describe("When a POST request arrives with a non existent username, a password and an email", () => {
    test("Then it should respond with a 201 status", async () => {
      await request
        .post("/user/register")
        .send({
          username: "Lola",
          password: "Lola",
          email: "loling@loling.com",
        })
        .expect(201);
    });
  });
});
