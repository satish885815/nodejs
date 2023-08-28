const connection = require("../../config/database");

const userModel = {
  createUser: async (data) => {
    const { name, emailId, password } = data;
    const query = "INSERT INTO user (emailId, name, password) VALUES (?, ?, ?)";
    const values = [emailId, name, password];
    return new Promise((reslove, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        }
        reslove(results.insertId);
      });
    });
  },
  getUserById: async (id) => {
    const query = "SELECT id,emailId,name FROM user WHERE id = ?";
    const values = [id];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  getAllUser: async () => {
    const query = "SELECT name,emailId,name from user";
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  },
};

module.exports = userModel;
