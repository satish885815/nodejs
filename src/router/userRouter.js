const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUser,
  userLogin,
} = require("../controller/userController");

const { verifyToken } = require("../auth/verifyToken");
router.post("/", createUser);
router.get("/:id", verifyToken, getUser);
router.get("/", verifyToken, getAllUser);
router.post("/login", userLogin);

module.exports = router;
