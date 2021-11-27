import express from "express";
import { validate } from "express-validation";
import {
  createPaper,
  deletePaper,
  filterPapers,
  getPaginatedPapers,
  updatePaper,
} from "../controllers/papersController";
import boardAuthentication from "../middlewares/boardAuthentication";
import firebase from "../middlewares/firebase";
import paperAuthentication from "../middlewares/paperAuthentication";
import uploadImages from "../middlewares/uploadImages";
import papersPath from "../paths/papersPath";
import paperSchema from "../schemas/paperSchema";

const router = express.Router();

router.get("/:idBoard?", boardAuthentication, filterPapers, getPaginatedPapers);

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
