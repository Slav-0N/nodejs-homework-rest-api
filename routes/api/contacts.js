const express = require("express");
const {
  auth,
  ctrlWrapper,
  validation,
  isValidId,
} = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../models/contacts");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.put(
  "/:id",
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.changeById)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteContact));

router.patch(
  "/:id/favorite",
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
