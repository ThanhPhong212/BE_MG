import bcrypt from "bcrypt";
import User from "../models/User";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authController = {
  registerUser: async (req, res) => {
    try {
      // create user
      const salt = await bcrypt.genSalt(10);
      const hased = await bcrypt.hash(req.body.password, salt);
      const newUser = await new User({
        username: req.body.username,
        password: hased,
        email: req.body.email,
      });
      //save user
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  generateToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.KEY_JWT,
      { expiresIn: "60s" }
    );
  },
  // generaterefreshToken: (user) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //       admin: user.admin,
  //     },
  //     process.env.KEY_JWT_REFRESH,
  //     { expiresIn: "30d" }
  //   );
  // },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(404).json("wrong username");
      }
      const valiPassword = await bcrypt.compare(req.body.password, user.password);
      if (!valiPassword) {
        res.status(404).json("wrong password");
      }
      if (user && valiPassword) {
        const token = authController.generateToken(user);
        // const refreshToken = authController.generaterefreshToken(user);

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token, refreshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
