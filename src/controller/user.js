import User from "../models/user";

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
    const id = req.params.userId || req.userId;

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.userid });
    if (!user) {
      return res.status(404).json({ error: `User not found` });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: `${error}` });
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "name"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    const user = await User.findOne({ _id: req.params.userid });
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

export { listUsers, listUser, deleteUser, updateUser };
