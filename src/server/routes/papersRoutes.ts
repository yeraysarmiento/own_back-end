import express from "express";
import { validate } from "express-validation";
import {
  createPaper,
  deletePaper,
  updatePaper,
} from "../controllers/papersController";
import firebase from "../middlewares/firebase";
import paperAuthentication from "../middlewares/paperAuthentication";
import uploadImages from "../middlewares/uploadImages";
import papersPath from "../paths/papersPath";
import paperSchema from "../schemas/paperSchema";

const router = express.Router();

router.post(
  papersPath.createPaper,
  uploadImages.array("images"),
  firebase,
  validate(paperSchema),
  createPaper
);

router.delete(papersPath.deletePaper, paperAuthentication, deletePaper);

router.patch(
  papersPath.updatePaper,
  uploadImages.array("images"),
  firebase,
  validate(paperSchema),
  updatePaper
);

export default router;
