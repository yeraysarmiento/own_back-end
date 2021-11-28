import express from "express";
import { validate } from "express-validation";
import {
  createBoard,
  deleteBoard,
  getBoard,
  updateBoard,
} from "../controllers/boardsController";
import firebase from "../middlewares/firebase";
import boardsPath from "../paths/boardsPath";
import boardSchema from "../schemas/boardSchema";
import uploadImages from "../middlewares/uploadImages";
import boardAuthentication from "../middlewares/boardAuthentication";

const router = express.Router();

router.get(boardsPath.getBoard, boardAuthentication, getBoard);

router.post(
  boardsPath.createBoard,
  uploadImages.array("logo", 5),
  firebase,
  validate(boardSchema),
  createBoard
);

router.delete(boardsPath.deleteBoard, boardAuthentication, deleteBoard);

router.patch(
  boardsPath.updateBoard,
  boardAuthentication,
  uploadImages.array("logo", 1),
  firebase,
  validate(boardSchema),
  updateBoard
);

export default router;
