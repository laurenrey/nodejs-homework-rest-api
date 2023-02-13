const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({
    verificationToken,
  });

  if (!user) {
    throw BadRequest("User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  return res.status(200).json({ message: "Verification successful" });
};

module.exports = verifyEmail;
