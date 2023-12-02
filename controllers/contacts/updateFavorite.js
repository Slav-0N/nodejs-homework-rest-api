const { Contact } = require("../../models");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  // console.log(result);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(result);
};

module.exports = updateFavorite;
