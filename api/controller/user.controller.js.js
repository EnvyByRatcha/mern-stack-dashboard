const mongoose = require("mongoose");
const UserModel = require("../model/user");

const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("allProperty");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
      return res
        .status(200)
        .send({ message: "User already registered", user: user });
    }

    const newUser = new UserModel({
      name,
      email,
      avatar,
    });

    await newUser.save();

    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, avatar } = req.body;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createUser,
};
