const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
require("dotenv").config();

module.exports = (role) => {
  return (req, res, next) => {
    try {
      if (req.user.role === "admin") {
        next();
      }
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: new Error("Invalid request"),
      });
    }
  };
};
