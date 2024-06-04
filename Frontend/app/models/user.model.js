const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        default: null
      }
    ],
    chats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
      }
    ]
  })
);

module.exports = User;