import express from "express";
import multer from "multer";
import path from "path";
import { createBoard, deleteBoard } from "../controllers/boardsControllers";
import firebase from "../middlewares/firebase";
import boardsPath from "../paths/boardsPath";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: "images",
    filename: (req, file, callback) => {
      const oldFilename = file.originalname;
      const oldFilenameExtension = path.extname(oldFilename);
      const oldFilenameWithoutExtension = oldFilename.replace(
        oldFilenameExtension,
        ""
      );

      const newFilename = `${oldFilenameWithoutExtension}-${Date.now()}-${oldFilenameExtension}`;
      callback(null, newFilename);
    },
  }),
});

router.post(
  boardsPath.createBoard,
  upload.single("logo"),
  firebase,
  createBoard
);
router.delete(boardsPath.deleteBoard, deleteBoard);

// router.patch(boardsPath.modifyBoard, updateBoard)

export default router;
