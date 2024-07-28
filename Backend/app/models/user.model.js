const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'https://www.gravatar.com/avatar/?d=identicon' },
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    userChats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
  })
);

module.exports = User;