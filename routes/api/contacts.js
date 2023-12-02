const express = require("express");
const { ctrlWrapper, validation } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.changeById));

router.delete("/:id", ctrlWrapper(ctrl.deleteContact));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
