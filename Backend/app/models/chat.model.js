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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
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
      ref: "Message",
      default: null,
    },
    calendar: [
      {
        type: Map,
        of: String,
        default: {}
      }  
    ],
    groupName: {
      type: String,
      required: true
    }
  })
);

module.exports = Chat;
