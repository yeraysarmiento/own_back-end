import express from "express";
import createPaper from "../controllers/papersController";
import authentication from "../middlewares/authentication";
import papersPath from "../paths/papersPath";

const router = express.Router();

router.post(papersPath.createPaper, authentication, createPaper);
// router.delete(papersPath.deletePaper, authentication, deletePaper);
// router.patch(papersPath.createPaper, authentication, updatePaper);

export default router;
