const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  next();
};

module.exports = isValidId;
