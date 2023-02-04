import { Schema, model } from "mongoose";

const bookListSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default model("Booklist", bookListSchema);
