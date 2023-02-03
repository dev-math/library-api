import { compare, genSalt, hash } from "bcrypt";
import User from "../models/user";

const createUser = async (req, res) => {
  try {
    const isSetted = await User.findOne({ email: req.body.email });
    if (isSetted) {
      throw new Error("Email already exists");
    }

    const user = new User(req.body);

    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    user.password = await hash(user.password, salt);

    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: `${error}` });
  }
};

const checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await compare(req.body.password, user.password);
    if (!checkPassword) {
      throw new Error("Login incorrect");
    }

    res.send("logado");
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const listUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

export { createUser, checkUser, listUsers, listUser };
