const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const uploadAvatar = async (req, res, next) => {
  const { filename } = req.file;

  const tmpPath = path.resolve(__dirname, "../../tmp", filename);
  const publicPath = path.resolve(__dirname, "../../public/avatars", filename);

  const image = await Jimp.read(tmpPath);
  await image.resize(100, 100).writeAsync(tmpPath);

  try {
    await fs.rename(tmpPath, publicPath);

    const userId = req.params.id;

    const avatarURL = `public/avatars/${filename}`;
    await User.findByIdAndUpdate(userId, { avatarURL });

    console.log("update avatar", { publicPath });
    return res.status(200).json({ data: { avatarURL } });
  } catch (error) {
    await fs.unlink(tmpPath);
    return res.status(404).json({ message: "Not authorized" });
  }
};

module.exports = uploadAvatar;
