const express = require("express");
const { ctrlWrapper, validation, auth } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");
const router = express.Router();

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
