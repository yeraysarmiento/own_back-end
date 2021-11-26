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
import uploadLogo from "../middlewares/uploadLogo";
import boardSchema from "../schemas/boardSchema";
import authentication from "../middlewares/authentication";

const router = express.Router();

router.get(boardsPath.getBoard, authentication, getBoard);

router.post(
  boardsPath.createBoard,
  uploadLogo.single("logo"),
  firebase,
  validate(boardSchema),
  createBoard
);

router.delete(boardsPath.deleteBoard, authentication, deleteBoard);

router.patch(
  boardsPath.updateBoard,
  authentication,
  uploadLogo.single("logo"),
  firebase,
  validate(boardSchema),
  updateBoard
);

export default router;
