import dotenv from "dotenv";
import log from "debug";
import chalk from "chalk";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../database/models/user";

dotenv.config();

const debug = log("own:userscontroller");

const getUserData = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

const loginUser = async (req, res, next) => {
  debug(chalk.green("An user has logged in"));
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    const error = new Error("Wrong credentials");
    error.code = 401;
    next(error);
  } else {
    const rightPassword = await bcrypt.compare(password, user.password);
    if (!rightPassword) {
      const error = new Error("Wrong password");
      error.code = 401;
      next(error);
    } else {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
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

const registerUser = async (req, res, next) => {
  const userToRegister = req.body;

  const user = await User.findOne({ username: userToRegister.username });

  if (user) {
    debug(chalk.red("Username already taken"));
    const error = new Error("Username already taken");
    error.code = 400;
    next(error);
  } else {
    try {
      const password = await bcrypt.hash(userToRegister.password, 10);

      const newUser = await User.create({
        username: userToRegister.username,
        password,
        email: registeredUser.email,
        boards: [],
      });

      debug(
        chalk.green(
          `New user registration: USERNAME: ${userToRegister.username} PASSWORD: ${userToRegister.password}`
        )
      );
      res.json(newUser);
    } catch {
      const error = new Error("Please, insert a valid format");
      error.code = 400;
      next(error);
    }
  }
};

export { loginUser, registerUser, getUserData };
