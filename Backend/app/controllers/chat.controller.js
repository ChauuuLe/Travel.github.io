const db = require("../models");
const Chat = db.chat;
const UserChat = db.userChat;
const User = db.user;

exports.createChat = async (req, res) => {
  console.log('cac tao a');
  try {
    const userId = req.userId; // This should be set by the verifyToken middleware
    const receiverId = req.body.receiverId;

    // Check if a chat already exists between these users
    const existingUserChat = await UserChat.findOne({
      receiver: receiverId,
      chat: { $in: (await Chat.find({})).map(chat => chat._id) }
    });

    if (existingUserChat) {
      return res.status(400).send({ message: "Chat already exists" });
    }

    // Create a new chat
    const chat = new Chat({});
    await chat.save();

    // Create a new user chat for the sender
    const senderUserChat = new UserChat({
      receiver: receiverId,
      chat: chat._id,
    });
    await senderUserChat.save();

    // Create a new user chat for the receiver
    const receiverUserChat = new UserChat({
      receiver: userId,
      chat: chat._id,
    });
    await receiverUserChat.save();

    // Update users' chat lists
    await User.findByIdAndUpdate(userId, { $push: { userChats: senderUserChat._id } });
    await User.findByIdAndUpdate(receiverId, { $push: { userChats: receiverUserChat._id } });

    res.status(201).send({ message: "Chat created successfully", chat: senderUserChat });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getChatInfo = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId)
      .populate("participants", "username email avatar")
      .populate({
        path: "messages",
        populate: {
          path: "sender",
          select: "username email avatar"
        }
      })
      .exec();

    if (!chat) {
      return res.status(404).send({ message: "Chat not found!" });
    }

    res.status(200).send(chat);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
