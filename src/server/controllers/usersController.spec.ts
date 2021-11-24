import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../database/models/user";
import { getUser, loginUser, OwnError, registerUser } from "./usersControllers";
import mockRequest from "../mocks/mockRequest";
import mockResponse from "../mocks/mockResponse";

jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../database/models/user");

describe("Given a getUser", () => {
  describe("When it receives a req object with a valid id on its params", () => {
    test("Then it should invoke the method json with the user searched", async () => {
      const user = {
        id: 1,
        username: "Loling",
        password: "loling",
        email: "loling",
        boards: [],
      };

      const req = mockRequest(user.id);
      const res = mockResponse();

      User.findById = jest.fn().mockResolvedValue(user);
      await getUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("When it receives a req object with an invalid id on its params", () => {
    test("Then it should invoke the function next with an error", async () => {
      const requestedId = 1;
      const error = new OwnError("User not found in our server");
      error.code = 400;
      User.findById = jest.fn().mockResolvedValue(null);
      const req = mockRequest(requestedId);
      const res = mockResponse();
      const next = jest.fn();

      await getUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
  describe("When it receives a req without an id property on its params", () => {
    test("Then it should invoke next with an error and code 401", async () => {
      const error = {
        message: "User not possible to find",
        code: 401,
      };

      User.findById = jest.fn().mockRejectedValue(error);
      const req = mockRequest(1);
      const res = mockResponse();
      const next = jest.fn();

      await getUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});

describe("Given an loginUser function", () => {
  describe("When it receives a request with an correct username and password", () => {
    test("Then it should invoke res.json with an object with a token", async () => {
      const req = mockRequest(1);
      req.body = {
        username: "loling",
        password: "loling",
      };

      const res = mockResponse();

      const next = jest.fn();

      User.findOne = jest.fn().mockResolvedValue({
        username: "marito",
        password: "marito",
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);
      const token = "maritotoken";
      jwt.sign = jest.fn().mockReturnValue(token);

      const expectedResponse = {
        user: token,
      };

      await loginUser(req, res, next);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });

  describe("When it receives a request with an not valid username", () => {
    test("Then it should invoke the next function with an error", async () => {
      const username = "loling";
      const req = mockRequest(1);
      req.body = {
        username,
      };
      const error: any = new Error("Wrong credentials");
      error.code = 401;
      const next = jest.fn();
      const res = mockResponse();
      User.findOne = jest.fn().mockResolvedValue(false);

      await loginUser(req, res, next);

      expect(User.findOne).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a request with a valid username and wrong password", () => {
    test("Then it should invoke the next function with an error", async () => {
      const req = mockRequest(1);
      req.body = {
        username: "loling",
        password: "luling",
      };
      const res = mockResponse();
      const next = jest.fn();
      User.findOne = jest.fn().mockResolvedValue({
        username: "marito",
        password: "marito",
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const error = new OwnError("Wrong password");
      error.code = 401;

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});

describe("Given an registerUser function", () => {
  describe("When it receives a req object with a not existing username", () => {
    test("Then it should respond with a 200 status", async () => {
      const user = {
        username: "loling",
        password: "loling",
        email: "lolingmail",
      };
      const newUser = {
        ...user,
        boards: [],
        password: "encrypted",
      };
      const req = mockRequest(1);
      req.body = user;

      User.findOne = jest.fn().mockResolvedValue(null);
      bcrypt.hash = jest.fn().mockResolvedValue(newUser.password);
      User.create = jest.fn().mockResolvedValue(newUser);

      const res = mockResponse();

      await registerUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });
  describe("When it receives a request with an existing username", () => {
    test("Then it should invoke next function with an error", async () => {
      const username = "loling";
      const req = mockRequest(1);
      req.body = {
        username,
      };
      const error = new OwnError("Username already taken");
      error.code = 400;
      const next = jest.fn();
      const res = mockResponse();
      User.findOne = jest.fn().mockResolvedValue(true);

      await registerUser(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });
});
