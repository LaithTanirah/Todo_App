const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: "forbidden",
    });
  } else {
    const token = req.headers.authorization.split(" ").pop();
    const payload = await jwt.verify(token, process.env.SECRET);
    if (!payload) {
      return res.status(403).json({
        success: false,
        message: "forbidden",
      });
    } else {
      req.token = payload;
      next();
    }
  }
};

module.exports = authentication;
