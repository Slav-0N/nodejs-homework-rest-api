const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const auth = require("./auth");
const isContactOwner = require("./isContactOwner");
const upload = require("./upload");
const resizeAvatar = require("./resizeAvatar");

module.exports = {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
  isContactOwner,
  upload,
  resizeAvatar,
};
