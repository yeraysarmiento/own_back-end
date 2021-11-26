import { Board } from "../../database/models/board";
import Paper from "../../database/models/paper";
import { User } from "../../database/models/user";
import mockRequestAuth from "../mocks/mockRequestAuth";
import mockResponse from "../mocks/mockResponse";
import {
  createBoard,
  deleteBoard,
  getBoard,
  updateBoard,
} from "./boardsController";
import { createPaper, deletePaper } from "./papersController";
import { OwnError } from "./usersController";

jest.mock("../../database/models/board");
jest.mock("../../database/models/user");
jest.mock("../../database/models/paper");

describe("Given a createPaper function", () => {
  describe("When it receives a valid board id and a req object with a paper", () => {
    test("Then it should invoke the method json with the new Paper created", async () => {
      const newPaper = {
        title: "Casa Ter",
        subtitle: "by Mesura",
        year: 2021,
        published: false,
        type: "Residential",
        location: "Baix Empordà",
        photograph: "José Hevia",
        text: "description",
        images: [],
      };
      Paper.create = jest.fn().mockResolvedValue(newPaper);
      Board.findOneAndUpdate = jest.fn().mockResolvedValue({});
      const req = mockRequestAuth(null, null, { params: { idBoard: 1 } });
      const res = mockResponse();
      const next = jest.fn();

      await createPaper(req, res, next);

      expect(res.json).toHaveBeenCalledWith(newPaper);
    });
  });
  describe("When it receives a valid board id and a req object with a not valid paper", () => {
    test("Then it should invoke next with an error message 'Please, insert a valid paper format'", async () => {
      const error = new OwnError("Please, insert a valid paper format");
      Paper.create = jest.fn().mockRejectedValue(null);
      const req = mockRequestAuth(null, null, { params: { idBoard: 1 } });
      const next = jest.fn();

      await createPaper(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a deletePaper function", () => {
  describe("When it receives a req object with a paper id on its params", () => {
    test("Then it should invoke the method json with the paper deleted", async () => {
      const deletedPaper = {
        id: 1,
      };
      const req = mockRequestAuth(null, null, { id: deletedPaper.id });
      const res = mockResponse();

      const next = jest.fn();
      Paper.findByIdAndDelete = jest.fn().mockResolvedValue(deletedPaper);
      Board.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      await deletePaper(req, res, next);

      expect(res.json).toHaveBeenCalledWith(deletedPaper);
    });
  });
  describe("When it receives a wrong req object with a paper id on its params", () => {
    test("Then it should invoke next with an error", async () => {
      const deletedPaper = {
        id: 1,
      };
      const req = mockRequestAuth(null, null, { id: deletedPaper.id });
      const res = mockResponse();
      const error = new OwnError("This paper does not exist in our database");
      const next = jest.fn();
      Paper.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await deletePaper(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
  describe("When it receives a req object without an id on its params", () => {
    test("Then it should invoke next with an error message 'It was not possible to delete the paper'", async () => {
      const req = mockRequestAuth(null, null, { id: 1 });
      const res = mockResponse();
      const error = new OwnError("It was not possible to delete the paper");
      const next = jest.fn();
      Paper.findByIdAndDelete = jest.fn().mockRejectedValue(null);

      await deletePaper(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
