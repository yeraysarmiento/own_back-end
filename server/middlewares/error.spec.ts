import { Response } from "express";
import { generalErrorHandler, notFoundErrorHandler } from "./error";

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn();
  res.json = jest.fn();
  return res;
};

describe("Given a notFoundErrorHandler,", () => {
  describe("When it is called", () => {
    test("Then it should invoke the method json", async () => {
      const res = mockResponse();

      await notFoundErrorHandler(null, res);

      expect(res.json).toHaveBeenCalled();
    });
    test("Then it should invoke the method json with an error 404", async () => {
      const res = mockResponse();

      await notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
    test("Then it should invoke the method json with a message 'Endpoint not found'", async () => {
      const res = mockResponse();

      await notFoundErrorHandler(null, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Endpoint not found" });
    });
  });
});

describe("Given a generalErrorHandler", () => {
  describe("When it's invoked by a default error", () => {
    test("Then it invokes  a 500 error", async () => {
      const error = { message: "hola" };
      const res = mockResponse();

      await generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
    test("Then it invokes the json method with an error of the message 'Little error'", async () => {
      const error = { code: 418, message: "Little error" };
      const res = mockResponse();

      await generalErrorHandler(error, null, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Little error" });
    });
  });
  describe("When it's invoked by a concrete error: code 418 and message 'Hola'", () => {
    test("Then it invokes  a 418 error", async () => {
      const error = { code: 418, message: "Hola" };
      const res = mockResponse();

      await generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(418);
    });
    test("Then it invokes the json method with an error of the message 'Little error'", async () => {
      const error = { code: 418, message: "Little error" };
      const res = mockResponse();

      await generalErrorHandler(error, null, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Little error" });
    });
  });
});
