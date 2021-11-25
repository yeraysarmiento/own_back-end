import express from "express";
import { validate } from "express-validation";
import usersPath from "../paths/usersPath";
import {
  loginUser,
  getUser,
  registerUser,
} from "../controllers/usersController";
import auth from "../middlewares/auth";
import loginSchema from "../schemas/loginSchema";
import registerSchema from "../schemas/registerSchema";

const router = express.Router();

router.get(usersPath.getUser, auth, getUser);
router.post(usersPath.loginUser, validate(loginSchema), loginUser);
router.post(usersPath.registerUser, validate(registerSchema), registerUser);

export default router;
