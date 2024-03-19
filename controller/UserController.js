const UserModel = require("../model/User");
const response = require("../utils/response");
const bcrypt = require("bcrypt");
require("dotenv").config();

const salt = process.env.SALT;

const SignUp = async (req, res) => {
  const { username, email, password, number } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, parseInt(salt));

    const user = await UserModel.create({
      username,
      email,
      password: hashPassword,
      number,
    });

    res.status(201).json(response(user, "User Created Succesfully", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
    console.log(error);
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json(response(null, "error", "User not found"));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(response(null, "error", "Password is incorrect"));
    }
    res.status(200).json(
      response(
        {
          username: user.username,
          email: user.email,
          number: user.number,
        },
        "Login Successfully",
        null
      )
    );
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
  }
};

const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findByIdAndDelete(userId);
    res.status(200).json(response(user, "User Deleted Successfully", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(response(users, "success", null));
  } catch (error) {
    res.status(500).json(response(null, "error", error.message));
  }
};

module.exports = { SignUp, Login, DeleteUser , getAllUser };
