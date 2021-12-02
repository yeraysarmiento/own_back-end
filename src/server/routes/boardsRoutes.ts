import express from "express";
import { validate } from "express-validation";
import {
  createBoard,
  deleteBoard,
  getBoard,
  updateBoard,
  getBoardByName,
} from "../controllers/boardsController";
import firebase from "../middlewares/firebase";
import boardsPath from "../paths/boardsPath";
import boardSchema from "../schemas/boardSchema";
import uploadImages from "../middlewares/uploadImages";
import boardAuthentication from "../middlewares/boardAuthentication";
import auth from "../middlewares/auth";

const router = express.Router();

router.get(boardsPath.getBoard, auth, boardAuthentication, getBoard);

router.get(boardsPath.getBoardByName, getBoardByName);

router.post(
  boardsPath.createBoard,
  auth,
  uploadImages.array("logo", 1),
  firebase,
  validate(boardSchema),
  createBoard
);

router.delete(boardsPath.deleteBoard, auth, boardAuthentication, deleteBoard);

router.patch(
  boardsPath.updateBoard,
  auth,
  boardAuthentication,
  uploadImages.array("logo", 1),
  firebase,
  validate(boardSchema),
  updateBoard
);

export default router;
