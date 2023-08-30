const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  verifyToken: (req, res, next) => {
    console.log(req);
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader.split(" ")[1];
    if (token) {
      verify(token, process.env.secReateKey, (err, decode) => {
        if (err) {
          res.status(403).send({
            statusCode: 403,
            succes: 1,
            message: "Invalid Token",
          });
        } else {
          next();
        }
      });
    } else {
      res.status(401).send({
        statusCode: 401,
        succes: 1,
        message: "Unauthorized error",
      });
    }
  },
};
