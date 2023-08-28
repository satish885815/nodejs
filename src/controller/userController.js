const { genSaltSync, hashSync } = require("bcrypt");
const userModel = require("../model/userModel");

const createUser = async (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  const response = await userModel.createUser(body);
  if (!response) {
    res.status(404).send({
      statusCode: 404,
      statusMessage: "User Not Found",
      message: error.message,
    });
  }
  res.status(200).send(response);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const response = await userModel.getUserById(id);
  if (!response) {
    res.status(404).send({
      statusCode: 404,
      statusMessage: "User Not Found",
      message: error,
    });
  }
  res.status(200).send(response);
};

const getAllUser = async (req, res) => {
  const response = await userModel.getAllUser();
  if (!response) {
    res.status(404).send({
      statusCode: 404,
      statusMessage: "No user Exist",
      message: error,
    });
  }
  res.status(200).send(response);
};

module.exports = { createUser, getUser, getAllUser };
