import { Schema, model, Types } from "mongoose";

interface SocialInterface {
  instagram: string;
  twitter: string;
  facebook: string;
}

interface BoardInterface {
  name: string;
  about: string;
  email: string;
  logo: string;
  category: string;
  social: SocialInterface;
  posts: number[];
}

const boardSchema: Schema<BoardInterface> = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  social: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
  posts: {
    type: [Types.ObjectId],
    ref: "Post",
    required: true,
  },
});

const User = model("Board", boardSchema);

export default User;
