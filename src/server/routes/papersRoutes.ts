import express from "express";
import { createPaper, deletePaper } from "../controllers/papersController";
import firebase from "../middlewares/firebase";
import uploadImages from "../middlewares/uploadImages";
import papersPath from "../paths/papersPath";

const router = express.Router();

router.post(
  papersPath.createPaper,
  uploadImages.array("images"),
  firebase,
  createPaper
);
router.delete(papersPath.deletePaper, deletePaper);
// router.patch(papersPath.createPaper, updatePaper);

export default router;
