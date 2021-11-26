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
import { createPaper } from "./papersController";
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
