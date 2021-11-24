import { Board } from "../../database/models/board";
import { User } from "../../database/models/user";
import mockRequestAuth from "../mocks/mockRequestAuth";
import mockResponse from "../mocks/mockResponse";
import { createBoard, deleteBoard } from "./boardsControllers";
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

describe("Given a deleteBoard function", () => {
  describe("When it receives a req object with a board id on its params", () => {
    test("Then it should invoke the method json with the board deleted", async () => {
      const deletedBoard = {
        id: 1,
      };
      const req = mockRequestAuth(null, null, { id: deletedBoard.id });
      const res = mockResponse();

      const next = jest.fn();
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(deleteBoard);
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await deleteBoard(req, res, next);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a req object with a board id on its params", () => {
    test("Then it should invoke the method json with the board deleted", async () => {
      const deletedBoard = {
        id: 1,
      };
      const req = mockRequestAuth(null, null, { id: deletedBoard.id });
      const res = mockResponse();
      const error = new OwnError("This board does not exist in our database");
      const next = jest.fn();
      Board.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a req object without an id on its params", () => {
    test("Then it should invoke next with an error message 'It was not possible to delete the board'", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const error = new OwnError("It was not possible to delete the board");
      const next = jest.fn();
      Board.findByIdAndDelete = jest.fn().mockRejectedValue(null);

      await deleteBoard(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
