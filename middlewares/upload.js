const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  fileName: (req, file, cb) => {
    cb(null, file.originalName);
  },
  limits: {
    fileSie: 2048,
  },
});

const upload = multer({
  storage: multerConfig,
});
module.exports = upload;
