import { User } from "../../database/models/user";
import mockRequestAuth from "../mocks/mockRequestAuth";
import mockResponse from "../mocks/mockResponse";
import OwnError from "../utils/OwnError";
import paperAuthentication from "./paperAuthentication";

jest.mock("../../database/models/paper");

describe("Given a boardAuthentication middleware", () => {
  describe("When it receives a paper id within the boards property of the user requester", () => {
    test("Then it should call method next", async () => {
      const req = mockRequestAuth(null, null, { idPaper: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const user = {
        boards: [{ papers: [1] }, { papers: [3] }],
      };

      User.findOne = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(user) });

      await paperAuthentication(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
  describe("When it receives a paper id not included in the boards property of the user requester", () => {
    test("Then it should invoke an error with a message'You are not allowed to edit'", async () => {
      const req = mockRequestAuth(null, null, { idPaper: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const error = new OwnError("You are not allowed to edit");
      const user = {
        boards: [{ papers: [2] }, { papers: [3] }],
      };

      User.findOne = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(user) });

      await paperAuthentication(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a not registered userId request", () => {
    test("Then it should invoke an error code 404", async () => {
      const req = mockRequestAuth(null, null, { idPaper: 1 });
      const res = mockResponse();
      const next = jest.fn();
      const error = new OwnError(
        "There has been an issue with your authentication"
      );

      User.findOne = jest.fn().mockRejectedValue({});

      await paperAuthentication(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
