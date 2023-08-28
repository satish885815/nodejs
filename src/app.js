const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const  userRouter  = require("./router/userRouter");
const port = process.env.port || 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
