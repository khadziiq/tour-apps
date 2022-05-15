import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
const secret_key = "secret";

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const hashPwd = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashPwd,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign(
      { email: result.email, id: result._id },
      secret_key,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exists" });

    const correctPassword = await bcrypt.compare(password, oldUser.password);

    if (!correctPassword)
      return res.status(404).json({ message: "Invalid Credential" });
    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      secret_key,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: oldUser, token });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
    console.log(error);
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, token, googleId } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      return res.status(200).json({ result, token });
    }
    const result = await User.create({
      email,
      name,
      googleId,
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
