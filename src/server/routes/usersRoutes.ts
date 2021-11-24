import express from "express";
import usersPath from "../paths/usersPath";
// // const { validate } = require("express-validation");
import {
  loginUser,
  getUser,
  registerUser,
} from "../controllers/usersControllers";
import auth from "../middlewares/auth";

const router = express.Router();

router.get(usersPath.getUser, auth, getUser);
router.post(usersPath.loginUser, loginUser);
router.post(usersPath.registerUser, registerUser);

export default router;
