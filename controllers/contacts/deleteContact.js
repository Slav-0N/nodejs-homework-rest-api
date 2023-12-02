const { Contact } = require("../../models");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json(result);
};

module.exports = deleteContact;
