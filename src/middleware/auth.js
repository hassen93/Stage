const jwt = require("jsonwebtoken");
const { User } = require("../model/user");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("az");
    const userId = decodToken.userId;
    const userDetails = await User.findById(userId);

    if (userDetails) {
      req.user = userDetails;
      console.log("req.user", req.user);
      next();
    } else {
      return res.status(403).json({
        status: 403,
        error: new Error("Invalid user"),
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: new Error("Invalid request"),
    });
  }
};
