const { Contact } = require("../models");
const isContactOwner = async (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const idContact = await Contact.findOne({ _id: id });

    if (!idContact || _id.toString() !== idContact.owner.toString()) {
      return res.status(404).json("Not found");
    }

    next();
  } catch (error) {
    res.status(500).json("Internal Server Error in isContactOwner.js");
    // таке повідомлення допомогло , коли після видалення контакта з'явилась помилка, при відсутній умові  !idContact в if
  }
};

module.exports = isContactOwner;
