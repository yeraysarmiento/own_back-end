import express from "express";
import { createBoard, deleteBoard } from "../controllers/boardsControllers";
import boardsPath from "../paths/boardsPath";

const router = express.Router();

router.post(boardsPath.createBoard, createBoard);
router.delete(boardsPath.deleteBoard, deleteBoard);

// router.patch(boardsPath.modifyBoard, updateBoard)

export default router;
