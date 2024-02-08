const express = require("express");
const uploadController = require("../controller/template");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/upload", upload.single("tpz"), uploadController.uploadFile);
router.get("/templates", uploadController.getAllTemplate);
router.delete("/template/:tempId", uploadController.DeleteTemp);

module.exports = router;
