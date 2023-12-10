const express = require("express");
const { ctrlWrapper } = require("../../middlewares");
const { currentUser: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/register", ctrlWrapper(ctrl.getCurrent));

module.exports = router;
