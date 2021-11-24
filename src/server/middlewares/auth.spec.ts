import jwt from "jsonwebtoken";
import auth from "./auth";
import OwnError from "../utils/OwnError";
import mockResponse from "../mocks/mockResponse";
import mockRequestAuth from "../mocks/mockRequestAuth";

jest.mock("jsonwebtoken");

describe("Given an Auth middleware", () => {
  describe("When it gets a request without a token", () => {
    test("Then it should send an error with a message 'A token is needed to access'", () => {
      const req = mockRequestAuth(null, null);
      const next = jest.fn();
      const error = new OwnError("A token is needed to access");
      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it gets a request with a valid Header but a not registered token", () => {
    test("Then it should send an error with a message 'A valid token is needed to access'", () => {
      const req = mockRequestAuth(null, "Bearer ");
      const next = jest.fn();
      const error = new OwnError("A valid token is needed to access");
      auth(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });

    describe("When it gets a request with a Authorization header and it validates", () => {
      test("Then it should add a property userId to the request and call next", async () => {
        const req = mockRequestAuth(null, "Bearer token");
        const next = jest.fn();

        jwt.verify = jest.fn().mockReturnValue("tokensito");
        await auth(req, null, next);

        expect(req).toHaveProperty("userId");
        expect(next).toHaveBeenCalled();
      });
    });

    describe("When it gets a request with a Authorization header but with an incorrect token", () => {
      test("Then it should send an error with a message 'Token no valid' and status 401", async () => {
        const req = mockRequestAuth(null, "Bearer token");
        const res = mockResponse();
        const next = jest.fn();
        jwt.verify = jest.fn().mockReturnValue(null);

        const error = new OwnError("A not valid token has been introduced");

        await auth(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
