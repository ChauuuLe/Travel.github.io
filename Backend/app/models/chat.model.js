const mongoose = require("mongoose");

const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ],
  })
);

module.exports = Chat;
