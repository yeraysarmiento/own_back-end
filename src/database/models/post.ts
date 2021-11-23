import { Schema, model, Types } from "mongoose";

interface PostInterface {
  title: string;
  subtitle: string;
  year: number;
  published: boolean;
  type: string;
  location: string;
  photograph: string;
  text: string;
  images: string[];
}

const postSchema: Schema<PostInterface> = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  photograph: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  images: {
    type: [Types.ObjectId],
    ref: "Post",
    required: true,
  },
});

const Post = model("Post", postSchema);

export default Post;
