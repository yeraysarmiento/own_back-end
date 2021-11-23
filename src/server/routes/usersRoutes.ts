import express from "express";
import usersPath from "../paths/usersPath";
// // const { validate } = require("express-validation");
import {
  loginUser,
  getUserData,
  registerUser,
} from "../controllers/usersControllers";

const router = express.Router();

router.get(usersPath.getUser, getUserData);
router.post(usersPath.loginUser, loginUser);
router.post(usersPath.registerUser, registerUser);

export default router;
