import express from "express";
import { validate } from "express-validation";
import usersPath from "../paths/usersPath";
import {
  loginUser,
  getUser,
  registerUser,
} from "../controllers/usersControllers";
import auth from "../middlewares/auth";
import loginSchema from "../schemas/loginSchema";

const router = express.Router();

router.get(usersPath.getUser, auth, getUser);
router.post(usersPath.loginUser, validate(loginSchema), loginUser);
router.post(usersPath.registerUser, registerUser);

export default router;
