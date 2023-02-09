import { Schema, model } from "mongoose";

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  booklists: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Booklist",
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();

  delete userObj._id;
  delete userObj.__v;
  delete userObj.password;

  return userObj;
};

export default model("User", userSchema);
