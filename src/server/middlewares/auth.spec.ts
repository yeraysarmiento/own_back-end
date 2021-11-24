import jwt from "jsonwebtoken";
import auth from "./auth";
import OwnError from "../utils/OwnError";

jest.mock("jsonwebtoken");

describe("Given an Auth middleware", () => {
  describe("When it gets a request without a token", () => {
    test("Then it should send an error with a message 'A token is needed to access' and status 401", () => {
      const req = {
        header: jest.fn(),
      };

      const res = {};

      const next = jest.fn();

      const expectedError = new NewError("Not authorized sorry");

      auth(req, res, next);
      expect(next).toBeCalledWith(expectedError);
    });
  });
  // describe("When it gets a request with a Authorization header but without a token", () => {
  //   test("Then it should send an error with a message 'Token is missing' and status 401", () => {
  //     const authHeader = "nunu";

  //     const req = {
  //       header: jest.fn().mockReturnValue(authHeader),
  //     };

  //     const res = {};
  //     const next = jest.fn();
  //     const expectedError = new NewError("Token is missing...");

  //     auth(req, res, next);

  //     expect(next).toHaveBeenCalledWith(expectedError);
  //   });
  // });
  // describe("When it gets a request with a Authorization header and it validates", () => {
  //   test("Then it should add userId and userName to req and call next", async () => {
  //     const req = {
  //       json: jest.fn(),
  //       header: jest.fn().mockReturnValue("Bearer token"),
  //     };

  //     const next = jest.fn();

  //     const res = {};

  //     jwt.verify = jest.fn().mockReturnValue("algo");
  //     await auth(req, res, next);

  //     expect(req).toHaveProperty("userId");
  //     expect(req).toHaveProperty("userName");
  //     expect(next).toHaveBeenCalled();
  //   });
  // });

  // describe("When it gets a request with a Authorization header but with an incorrect token", () => {
  //   test("Then it should send an error with a message 'Token no valid' and status 401", async () => {
  //     const req = {
  //       json: jest.fn(),
  //       header: jest.fn().mockReturnValue("Bearer token"),
  //     };

  //     const next = jest.fn();
  //     const errorSent = new NewError("Token not valid");
  //     errorSent.code = 401;

  //     const res = {};

  //     jwt.verify = jest.fn().mockReturnValue(null);
  //     await auth(req, res, next);

  //     expect(next).toHaveBeenCalledWith(errorSent);
  //   });
  // });
});
