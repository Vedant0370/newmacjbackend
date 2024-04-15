const express = require("express")
const ExecutiveController = require("../controller/ExecutiveController")

const router = express.Router()

router.get("/", ExecutiveController.getAllExecutive)
router.post("/login", ExecutiveController.LoginExecutive)
router.post("/register", ExecutiveController.Ragister)
router.delete("/:id", ExecutiveController.DeleteExecutive)
router.patch("/:id", ExecutiveController.updateExecutive)
router.get("/:id", ExecutiveController.getExecutiveById)


module.exports = router 

