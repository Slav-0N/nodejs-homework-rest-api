const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { email, password } = req.body;

  const avatarURL = gravatar.url(email);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = uuidv4();

  const newUser = new User({ email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    //   from: "sovilgo@gmail.com",
    subject: "Підтвердження адреси email",
    html: `<a target="_blank"  href="http://localhost:3000/api/users/verify/${verificationToken}" > Натисни для підтвердження email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
