const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    res.json({ success: false, message: "not found token" });
  }
  try {
    const decoded = jwt.verify(token, sails.config.custom.jwt.secret);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
