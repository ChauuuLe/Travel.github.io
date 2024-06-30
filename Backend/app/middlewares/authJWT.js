const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

const verifyToken = async (req) => {
  let token = req.headers["x-access-token"] || req.session.token;

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;
    return true;
  } catch (err) {
    return false;
  }
};

const isAdmin = async (req) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return false;
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    return roles.some(role => role.name === "admin");
  } catch (err) {
    return false;
  }
};

const isModerator = async (req) => {
  try {
    const user = await User.findById(req.userId).exec();
    if (!user) {
      return false;
    }

    const roles = await Role.find({ _id: { $in: user.roles } }).exec();
    return roles.some(role => role.name === "moderator");
  } catch (err) {
    return false;
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
};
