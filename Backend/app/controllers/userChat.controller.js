const db = require("../models/index.js");
const UserChat = db.userChat;

exports.getUserChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userChats = await UserChat.find({ receiver: userId })
      .populate("receiver", "username email avatar")
      .populate({
        path: "lastMessage",
        populate: {
          path: "sender",
          select: "username email avatar"
        }
      })
      .exec();

    if (!userChats) {
      return res.status(404).send({ message: "User chats not found!" });
    }

    res.status(200).send(userChats);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
