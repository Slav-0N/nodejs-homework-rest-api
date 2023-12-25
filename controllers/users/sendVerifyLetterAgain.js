// const { BadRequest } = require("http-errors");
const { User } = require("../../models");
const sendEmail = require("../../helpers/sendEmail");

const dotenv = require("dotenv");
dotenv.config();

const { DOMAIN } = process.env;

const sendVerifyLetterAgain = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }
    // const user = await User.findOne({ verificationToken });

    const { verificationToken } = user;
    const mail = {
      to: email,
      subject: "Підтвердження адреси email",
      html: `<a target="_blank"  href="${DOMAIN}api/users/verify/${verificationToken}" > Натисни для підтвердження email</a>`,
    };
    await sendEmail(mail);

    return res.json({ message: "New email request was send" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = sendVerifyLetterAgain;
