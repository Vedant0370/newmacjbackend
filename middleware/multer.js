const multer = require("multer");
const path = require("path");

const storageOptions = {
  destination: (req, file, cb) => {
    cb(null, "./tpz");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
};

const storage = multer.diskStorage(storageOptions);

const upload = multer({ storage: storage });

module.exports = upload;
