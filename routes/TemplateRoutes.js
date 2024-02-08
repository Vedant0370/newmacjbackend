const express = require("express");
const uploadController = require("../controller/template");
const upload = require("../middleware/multer");

const router = express.Router();

router.post(
  "/uploadTemplate",
  upload.single("tpz"),
  uploadController.uploadFile
);
router.get("/templates", uploadController.getAllTemplate);
router.delete("/template/:tempId", uploadController.DeleteTemp);
router.get("/template/:tempId", uploadController.getById);

module.exports = router;
