import { User } from "../../database/models/user";
import mockRequestAuth from "../mocks/mockRequestAuth";
import mockResponse from "../mocks/mockResponse";
import OwnError from "../utils/OwnError";
import boardAuthentication from "./boardAuthentication";

jest.mock("../../database/models/user");

describe("Given a boardAuthentication middleware", () => {
  describe("When it receives a board id within the user id requester", () => {
    test("Then it should call method next", async () => {
      const req = mockRequestAuth(null, null, { idBoard: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const user = {
        boards: [1],
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      await boardAuthentication(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a board id not included in the user id requester", () => {
    test("Then it should invoke an error with a message'You are not allowed to edit'", async () => {
      const req = mockRequestAuth(null, null, { idBoard: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const error = new OwnError("You are not allowed to edit");
      const user = {
        boards: [2],
      };

      User.findOne = jest.fn().mockResolvedValue(user);

      await boardAuthentication(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
