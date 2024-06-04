const db = require("../models");
const Chat = db.chat;
const User = db.user;

// Create a new chat message
exports.createChat = async (req, res) => {
  try {
    const chat = new Chat({
      sender: req.userId,
      receiver: req.body.receiverId,
      message: req.body.message,
    });

    const savedChat = await chat.save();

    // Add chat reference to sender and receiver
    await User.findByIdAndUpdate(req.userId, { $push: { chats: savedChat._id } });
    await User.findByIdAndUpdate(req.body.receiverId, { $push: { chats: savedChat._id } });

    res.status(201).send(savedChat);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Retrieve chat messages for a user
exports.getChats = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate({
      path: 'chats',
      populate: { path: 'sender receiver', select: 'username' }
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user.chats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
