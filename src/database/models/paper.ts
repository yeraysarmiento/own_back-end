import { Schema, model } from "mongoose";

interface PaperInterface {
  title: string;
  subtitle: string;
  year: number;
  published: boolean;
  type: string;
  location: string;
  photograph: string;
  text: string;
  images: string;
}

const paperSchema: Schema<PaperInterface> = new Schema({
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
    type: String,
  },
});

const Paper = model("Paper", paperSchema, "papers");

export default Paper;
