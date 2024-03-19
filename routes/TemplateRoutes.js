const express = require("express");
const uploadController = require("../controller/template");
const upload = require("../middleware/multer");

const router = express.Router();

router.post(
  "/uploadTemplate",
  upload.single("tpz"),
  uploadController.uploadFile
);
router.get("/", uploadController.getAllTemplate);
router.delete("/:tempId", uploadController.DeleteTemp);
router.get("/:tempId", uploadController.getById);

module.exports = router;
