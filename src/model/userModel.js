const connection = require("../../config/database");

const userModel = {
  createUser: async (data) => {
    const { name, emailId, password } = data;
    const query = "INSERT INTO user (emailId, name, password) VALUES (?, ?, ?)";
    const values = [emailId, name, password];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (results && results.insertId) {
          resolve(results.insertId);
        } else {
          reject(new Error("User creation failed"));
        }
      });
    });
  },

  getUserById: async (id) => {
    const query = "SELECT id, emailId, name FROM user WHERE id = ?";
    const values = [id];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            const notFoundError = new Error(`User with ID ${id} not found`);
            reject(notFoundError);
          } else {
            resolve(results[0]);
          }
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
        } else {
          if (results.length == 0) {
            const notFoundError = new Error("No User found");
            reject(notFoundError);
          } else {
            resolve(results);
          }
        }
      });
    });
  },

  getUserByEmail: async (emailId) => {
    const query = "SELECT * from user WHERE emailId=?";
    const values = [emailId];
    return new Promise((resolve, reject) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length == 0) {
            const notFoundError = new Error(
              `User is not exist with this ${emailId}`
            );
            reject(notFoundError);
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  },
};

module.exports = userModel;
