const db = require("../models");
const Chat = db.chat;
const User = db.user;
const Date = db.date;

exports.createGroup = async (req, res) => {
  try {
    console.log('asdasd');
    const { listOfUsers, selectedDates, groupName } = req.body;
    const memberIds = listOfUsers.members.map(member => member._id);
    const calendar = selectedDates.map((obj) => {
      const date = Date.create({
        username: obj.username,
        dates: obj.dates
      });
      return date._id;
    });
    console.log('ccacccacacacasc');
    console.log(memberIds);
    console.log(calendar);
    console.log(groupName);

    const chat = new Chat({
      members: memberIds,
      calendar: calendar,
      groupName: groupName.groupName
    });

    await chat.save();

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $push: { userChats: chat._id } }
    );

    res.status(201).json(chat);
  } catch (error) {
    console.log(error);
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
