const mongoose = require("mongoose");

const userChatSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
  isSeen: { 
    type: Boolean, 
    default: false 
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  },
  chat: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
    required: true
  }
});

const UserChat = mongoose.model("UserChat", userChatSchema);

module.exports = UserChat;
