import express from "express";
import { createBoard, deleteBoard } from "../controllers/boardsControllers";
import firebase from "../middlewares/firebase";
import boardsPath from "../paths/boardsPath";
import upload from "../middlewares/upload";

const router = express.Router();

router.post(
  boardsPath.createBoard,
  upload.single("logo"),
  firebase,
  createBoard
);
router.delete(boardsPath.deleteBoard, deleteBoard);

// router.patch(boardsPath.modifyBoard, updateBoard)

export default router;
