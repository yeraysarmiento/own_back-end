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
  papers: string[];
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
  papers: {
    type: [Types.ObjectId],
    ref: "Paper",
    required: true,
  },
});

const Board = model("Board", boardSchema);

export { Board, BoardInterface };
