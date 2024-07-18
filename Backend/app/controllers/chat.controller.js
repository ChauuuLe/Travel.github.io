const db = require("../models");
const Chat = db.chat;
const User = db.user;
const DateStatus = db.dateStatus;

exports.createGroup = async (req, res) => {
  try {
    const { listOfUsers, selectedDates, groupName } = req.body;
    console.log('Request Body:', req.body);

    const memberIds = listOfUsers.members.map(member => member._id);
    console.log('Member IDs:', memberIds);

    const calendar = await Promise.all(selectedDates.map(async (obj) => {
      const dateStatus = new DateStatus({
        username: obj.username,
        dates: obj.dates
      });
      await dateStatus.save();
      return dateStatus._id.toString();
    }));

    console.log('Calendar:', calendar);

    const chat = new Chat({
      members: memberIds,
      calendar: calendar,
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

    res.status(200).send(chat);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
