const db = require("../models/index.js");
const User = db.user;
const authJwt = require("../middlewares/authJWT.js"); 

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = async (req, res) => {
  const isVerified = authJwt.verifyToken(req, res, () => {});
  if (!isVerified) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
  res.status(200).send("User Content.");
};

exports.adminBoard = async (req, res) => {
  const isVerified = authJwt.verifyToken(req, res, () => {});
  if (!isVerified) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const isAdmin = await authJwt.isAdmin(req, res, () => {});
  if (!isAdmin) {
    return res.status(403).send({ message: "Require Admin Role!" });
  }

  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = async (req, res) => {
  const isVerified = authJwt.verifyToken(req, res, () => {});
  if (!isVerified) {
    return res.status(401).send({ message: "Unauthorized!" });
  }

  const isModerator = await authJwt.isModerator(req, res, () => {});
  if (!isModerator) {
    return res.status(403).send({ message: "Require Moderator Role!" });
  }

  res.status(200).send("Moderator Content.");
};

exports.searchUsers = async (req, res) => {
  const searchTerm = req.query.username; // Correctly match the query parameter
  try {
    const user = await User.findOne({ username: { $regex: searchTerm, $options: "i" } })
      .populate("roles", "-__v")
      .populate("userChats", "groupName lastMessage")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name),
      avatar: user.avatar,
      userChats: user.userChats.map(chat => ({
        _id: chat._id,
        groupName: chat.groupName,
        lastMessage: chat.lastMessage
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate("roles", "-__v")
      .populate("userChats", "groupName lastMessage")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User not found!" });
    }

    res.status(200).send({
      _id: user._id,
      username: user.username,
      email: user.email,
      roles: user.roles.map(role => role.name),
      avatar: user.avatar,
      userChats: user.userChats.map(chat => ({
        _id: chat._id,
        groupName: chat.groupName,
        lastMessage: chat.lastMessage
      }))
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};