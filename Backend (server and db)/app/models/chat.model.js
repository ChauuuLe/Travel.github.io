const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = Chat;