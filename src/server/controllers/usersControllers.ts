import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  User,
  UserInterface,
  UserToRegister,
} from "../../database/models/user";

const debug = log("own:userscontroller");

dotenv.config();

class OwnError extends Error {
  code: number | undefined;
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id: idUser } = req.params;

  try {
    const searchedUser: UserInterface = await User.findById(idUser);
    // .populate([
    //   {
    //     path: "boards",
    //   },
    // ]);

    if (searchedUser) {
      res.status(200);
      res.json(searchedUser);
    } else {
      const error = new OwnError("User not found in our server");
      // error.code = 400;
      next(error);
    }
  } catch (error) {
    error.message = "User not possible to find";
    error.code = 401;

    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  debug(chalk.green("An user has logged in"));
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    const error = new OwnError("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword: string = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new OwnError("Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token: string = jwt.sign(
        {
          id: user.id,
          username: user.username,
        },
        process.env.SECRET,
        {
          expiresIn: 24 * 60 * 60,
        }
      );
      res.json({ user: token });
    }
  }
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userToRegister: UserToRegister = req.body;

  const user: UserInterface = await User.findOne({
    username: userToRegister.username,
  });

  if (user) {
    debug(chalk.red("Username already taken"));
    const error = new OwnError("Username already taken");
    error.code = 400;
    next(error);
  } else {
    try {
      const password: string = await bcrypt.hash(userToRegister.password, 10);

      const newUser: UserInterface = await User.create({
        username: userToRegister.username,
        password,
        email: userToRegister.email,
        boards: [],
      });

      debug(
        chalk.green(
          `New user registration: USERNAME: ${userToRegister.username} PASSWORD: ${userToRegister.password}`
        )
      );
      res.json(newUser);
    } catch {
      const error = new OwnError("Please, insert a valid format");
      error.code = 400;
      next(error);
    }
  }
};

export { OwnError, getUser, loginUser, registerUser };
