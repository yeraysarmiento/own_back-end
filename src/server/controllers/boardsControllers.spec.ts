import { Board } from "../../database/models/board";
import { User } from "../../database/models/user";
import mockRequestAuth from "../mocks/mockRequestAuth";
import mockResponse from "../mocks/mockResponse";
import { createBoard } from "./boardsControllers";
import { OwnError } from "./usersControllers";

jest.mock("../../database/models/board");
jest.mock("../../database/models/user");

describe("Given a createBoard function", () => {
  describe("When it receives a req object with a board", () => {
    test("Then it should invoke the method json with the board created", async () => {
      const newBoard = {
        id: 1,
        name: "string",
        about: "string",
        email: "string",
        logo: "string",
        category: "string",
        social: {
          instagram: "string",
          twitter: "string",
          facebook: "string",
        },
        posts: [],
      };
      const req = mockRequestAuth(newBoard);
      req.file = { fileURL: newBoard.logo };
      const res = mockResponse();
      const next = jest.fn();

      Board.create = jest.fn().mockResolvedValue({
        ...req.body,
        logo: newBoard.logo,
        posts: [],
      });

      User.findOneAndUpdate = jest.fn().mockResolvedValue({});

      await createBoard(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newBoard);
    });
  });
  describe("When it receives a not valid req object", () => {
    test("Then it should invoke the method next with an error message 'Please, insert a valid board format", async () => {
      const newBoard = {};
      const req = mockRequestAuth(newBoard);
      req.file = { fileURL: "" };
      const next = jest.fn();
      const error = new OwnError("Please, insert a valid board format");

      Board.create = jest.fn().mockRejectedValue({});

      User.findOneAndUpdate = jest.fn().mockResolvedValue({});

      await createBoard(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
