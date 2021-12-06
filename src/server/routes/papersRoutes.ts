import express from "express";
import { validate } from "express-validation";
import {
  createPaper,
  deletePaper,
  filterPapers,
  getPaginatedPapers,
  updatePaper,
} from "../controllers/papersController";
import firebase from "../middlewares/firebase";
import paperAuthentication from "../middlewares/paperAuthentication";
import uploadImages from "../middlewares/uploadImages";
import papersPath from "../paths/papersPath";
import paperSchema from "../schemas/paperSchema";
import auth from "../middlewares/auth";

const router = express.Router();

router.get("/:idBoard?", filterPapers, getPaginatedPapers);

router.post(
  papersPath.createPaper,
  auth,
  uploadImages.array("images"),
  firebase,
  validate(paperSchema),
  createPaper
);

router.delete(papersPath.deletePaper, auth, paperAuthentication, deletePaper);

router.patch(
  papersPath.updatePaper,
  auth,
  uploadImages.array("images"),
  firebase,
  validate(paperSchema),
  updatePaper
);

export default router;
