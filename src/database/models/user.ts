import { Schema, model, Types } from "mongoose";

interface UserInterface {
  username: string;
  email: string;
  password: string;
  boards: string[];
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

export default User;
