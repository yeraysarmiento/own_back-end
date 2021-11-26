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
import authentication from "../middlewares/authentication";
import uploadImages from "../middlewares/uploadImages";

const router = express.Router();

router.get(boardsPath.getBoard, authentication, getBoard);

router.post(
  boardsPath.createBoard,
  uploadImages.array("logo"),
  firebase,
  validate(boardSchema),
  createBoard
);

router.delete(boardsPath.deleteBoard, authentication, deleteBoard);

router.patch(
  boardsPath.updateBoard,
  authentication,
  uploadImages.array("logo"),
  firebase,
  validate(boardSchema),
  updateBoard
);

export default router;
