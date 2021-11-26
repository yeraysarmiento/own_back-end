import express from "express";
import {
  createPaper,
  deletePaper,
  updatePaper,
} from "../controllers/papersController";
import firebase from "../middlewares/firebase";
import paperAuthentication from "../middlewares/paperAuthentication";
import uploadImages from "../middlewares/uploadImages";
import papersPath from "../paths/papersPath";

const router = express.Router();

router.post(
  papersPath.createPaper,
  uploadImages.array("images"),
  firebase,
  createPaper
);

router.delete(papersPath.deletePaper, paperAuthentication, deletePaper);

router.patch(papersPath.createPaper, updatePaper);

export default router;
