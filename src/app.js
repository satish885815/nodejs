const express = require("express");
require("dotenv").config();
const port = process.env.port || 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Home");
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
