const db = require("../models");
const Chat = db.chat;
const User = db.user;

exports.createGroup = async (req, res) => {
  try {
    const { listOfUsers, selectedDates, groupName } = req.body;

    const chat = new Chat({
      members: listOfUsers.members.map(member => member._id),
      dates: selectedDates,
      groupName: groupName
    });

    await chat.save();

    // Update each user's userChats array
    const memberIds = listOfUsers.members.map(member => member._id);
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $push: { userChats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getChatInfo = async (req, res) => {
  try {
    const chatId = req.params.chatId;
    const chat = await Chat.findById(chatId)
      .populate("members", "username email avatar")
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
