import { Schema, model } from "mongoose";

interface PaperInterface {
  title: string;
  author: string;
  year: number;
  published: boolean;
  type: string;
  location: string;
  photograph: string;
  text: string;
  images: string[];
  deleted: boolean;
}

const paperSchema: Schema<PaperInterface> = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
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
  },
  text: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Paper = model("Paper", paperSchema, "papers");

export default Paper;
