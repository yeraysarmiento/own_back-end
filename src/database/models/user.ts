import { Schema, model, Types } from "mongoose";

interface UserInterface {
  username: string;
  email: string;
  password: string;
  boards: string[];
}
interface UserToRegister {
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema<UserInterface> = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  boards: {
    type: [Types.ObjectId],
    ref: "Board",
    required: true,
  },
});

const User = model("User", userSchema);

export { User, UserInterface, UserToRegister };
