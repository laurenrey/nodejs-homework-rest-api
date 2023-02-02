const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL,
    });
    res.status(201).json({
      data: {
        user: {
          email,
          id: savedUser._id,
          avatarURL,
        },
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("Email in use");
    }
    throw error;
  }
};

module.exports = register;
