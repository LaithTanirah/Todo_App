const usersSchema = require("../models/usersSchema");
const userModel = require("../models/usersSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  const { userName, email, password } = req.body;
  const newUser = new userModel({ userName, email, password });
  newUser
    .save()
    .then((User) => {
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
        roleIngo: User,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Somthing Went Wrong",
        error: err,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  usersSchema
    .find({ email })
    .populate("role")
    .then((User) => {
      if (!User.length)
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      const isValidPassword = bcrypt.compare(password, User[0].password);
      if (!isValidPassword)
        return res.status(400).json({
          success: false,
          message: "Wrong Email Or Password",
        });
      const payload = {
        userId: User[0]._id,
        userName: User[0].userName,
        email: User[0].email,
        role: User[0].role,
      };
      console.log(payload);
      const options = {
        expiresIn: "1d",
      };
      const token = jwt.sign(payload, process.env.SECRET, options);
      res.status(200).json({
        success: true,
        message: "Login Successfully",
        userInfo: User,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Somthing Went Wrong",
        error: err,
      });
    });
};

module.exports = { register, login };
