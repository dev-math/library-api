import User from "../models/user";

const createUser = async (req, res) => {
  try {
    const isSetted = await User.findOne({ email: req.body.email });
    if (isSetted) {
      throw new Error("Email exists");
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    res.stataus(400).send(e);
  }
};

export { createUser };
