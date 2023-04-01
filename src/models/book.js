import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
  },
  cover_i: {
    type: String,
    required: true,
  },
});

export default model("Book", bookSchema);
