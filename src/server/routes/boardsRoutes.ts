import express from "express";
import { validate } from "express-validation";
import { createBoard, deleteBoard } from "../controllers/boardsControllers";
import firebase from "../middlewares/firebase";
import boardsPath from "../paths/boardsPath";
import uploadLogo from "../middlewares/uploadLogo";
import boardSchema from "../schemas/boardSchema";

const router = express.Router();

router.post(
  boardsPath.createBoard,
  uploadLogo.single("logo"),
  firebase,
  validate(boardSchema),
  createBoard
);
router.delete(boardsPath.deleteBoard, deleteBoard);

// router.patch(boardsPath.modifyBoard, updateBoard)

export default router;
