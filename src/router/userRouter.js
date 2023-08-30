const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUser,
  userLogin,
} = require("../controller/userController");
router.post("/", createUser);
router.get("/:id", getUser);
router.get("/", getAllUser);
router.post("/login", userLogin);

module.exports = router;
