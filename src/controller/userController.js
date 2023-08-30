const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const userModel = require("../model/userModel");
require("dotenv").config();

const createUser = async (req, res) => {
  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);
  try {
    const response = await userModel.createUser(body);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({
      statusCode: 400,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await userModel.getUserById(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({
      statusCode: 404,
      message: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await userModel.getAllUser();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send({
      statusCode: 404,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const response = await userModel.getUserByEmail(emailId);
    const isPasswordMatch = compareSync(password, response.password);
    if (!isPasswordMatch) {
      res.status(401).send({
        statusCode: 401,
        message: "Incorrect password",
      });
      return;
    }
    const userData = {
      id: response.id,
      name: response.name,
      emailId: response.emailId,
    };
    const jsonwebToken = sign(userData, process.env.secReateKey, {
      expiresIn: "1h",
    });
    res.send({
      succes: 1,
      message: "User Login successfully",
      token: jsonwebToken,
    });
  } catch (error) {
    res.status(404).send({
      statusCode: 404,
      message: error.message,
    });
  }
};

module.exports = { createUser, getUser, getAllUser, userLogin };
