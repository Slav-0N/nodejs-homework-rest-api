const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const { BadRequest } = require("http-errors");

const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  if (req.file === undefined) {
    throw new BadRequest("You forgot to attach an avatar file !");
  }

  const { path: tempUpLoad, originalname } = req.file;

  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpLoad, resultUpload);
    const avatarURL = path.join("public", "avatars", imageName);

    const smallAvatar = await Jimp.read(resultUpload);
    await smallAvatar.resize(250, 250);
    await smallAvatar.writeAsync(resultUpload);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpLoad);
    throw error;
  }
};

module.exports = updateAvatar;
