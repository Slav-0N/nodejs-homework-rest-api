const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findOne({ _id: id });

  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(result);
};

module.exports = getById;
