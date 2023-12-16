const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;

  const avatarURL = gravatar.url(email);

  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const newUser = new User({ email, avatarURL });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    status: "Created",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
      },
    },
  });
};

module.exports = register;
