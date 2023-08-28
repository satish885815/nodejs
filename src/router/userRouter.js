const express = require("express");
const router = express.Router();
const {
  createUser,
  getUser,
  getAllUser,
} = require("../controller/userController");
router.post("/", createUser);
router.get("/:id", getUser);
router.get("/", getAllUser);

module.exports = router;
