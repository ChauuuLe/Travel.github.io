const mongoose = require("mongoose");

const expense = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  payStatus: {
    type: Map,
    of: Boolean,
    default: {}
  },
  day: {
    type: Date,
    default: Date.now()
  }
});

// Define the Chat model
const Chat = mongoose.model(
  "Chat",
  new mongoose.Schema({
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
    },
    expenseTracking: [expense]
  })
);

module.exports = Chat;
