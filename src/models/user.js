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
    required: true
  }
});

export default model('User', userSchema);
