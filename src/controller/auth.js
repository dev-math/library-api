import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user";

const createUser = async (req, res) => {
  try {
    const isSetted = await User.findOne({ email: req.body.email });
    if (isSetted) {
      throw new Error("Email already exists");
    }

    const user = new User(req.body);

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Login incorrect");
    }

    const checkPassword = await compare(req.body.password, user.password);
    if (!checkPassword) {
      throw new Error("Login incorrect");
    }

    const jwtSecretKey = "secretkey";
    const token = jwt.sign({ _id: user._id.toString() }, jwtSecretKey, {
      expiresIn: 60,
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export { createUser, checkUser };
