const { sendMail } = require("../../helpers/helpers");
const { User } = require("../../models/user");

const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "missing required field email" });
  }
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  await sendMail(email);
  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
