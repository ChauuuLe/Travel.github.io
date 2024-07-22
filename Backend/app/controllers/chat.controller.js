const db = require("../models");
const Chat = db.chat;
const User = db.user;

exports.createGroup = async (req, res) => {
  try {
    const { members, selectedDates, groupName } = req.body;
    console.log('Request Body:', req.body);

    const memberIds = members.map(member => member._id);
    console.log('Member IDs:', memberIds);

    console.log('Calendar:', selectedDates);

    const chat = new Chat({
      members: memberIds,
      calendar: selectedDates,
      groupName: groupName.groupName
    });

    await chat.save();
    console.log('Chat Saved:', chat);

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $push: { userChats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (error) {
    console.error('Error:', error);
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

    console.log(`chat: ${chat}`);
    res.status(200).send(chat);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};
