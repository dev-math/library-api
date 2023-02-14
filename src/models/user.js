import { genSalt, hash } from "bcrypt";
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
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    user.password = await hash(user.password, salt);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;

  const userObj = user.toObject();

  delete userObj._id;
  delete userObj.__v;
  delete userObj.password;

  return userObj;
};

userSchema.virtual("booklists", {
  ref: "Booklist",
  localField: "_id",
  foreignField: "owner",
});

export default model("User", userSchema);
