const express = require("express");
const router = express.Router();

const {
  getAllUser,
  DeleteUser,
  Login,
  SignUp,
} = require("../controller/UserController");

router.get("/", getAllUser);
router.post("/login", Login);
router.post("/signup", SignUp);
router.delete("/:userId", DeleteUser);

module.exports = router;
