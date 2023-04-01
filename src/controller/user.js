import User from "../models/user";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
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

export const checkUser = async (req, res) => {
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
      expiresIn: 86400, // 1 day
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export const listUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};
