const express = require('express');
const inpectionController = require("../controller/InspectionController")

const router = express.Router();


router.get("/" , inpectionController.getAllInpection)
router.delete("/" , inpectionController.deleteInspection)


module.exports = router;

