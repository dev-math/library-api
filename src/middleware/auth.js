import jwt from "jsonwebtoken";
import User from "../models/user";

const jwtSecretKey = "secretkey";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, jwtSecretKey);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.userId = user._id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate" });
  }
};

export default auth;
