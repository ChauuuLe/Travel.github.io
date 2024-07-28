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

exports.getUserChats = async (req, res) => {
  try {
    const userId = req.userId; // Assuming userId is set in the middleware
    const user = await User.findById(userId).populate({
      path: 'userChats',
      populate: {
        path: 'lastMessage',
        select: 'text createdAt sender',
        populate: {
          path: 'sender',
          select: 'username avatar'
        }
      }
    });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.status(200).send(user.userChats);
  } catch (err) {
    res.status(500).send({ message: err.message });
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
    console.log(err);
    res.status(500).send({ message: err.message });
  }
};

exports.updateChatSchedule = async (req, res) => {
  const { chatId } = req.params;
  const { calendar } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        calendar: [calendar],
      },
      { new: true } // Return the updated document
    );

    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error('Error updating chat calendar:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateChatExpenseTracking = async (req, res) => {
  const { chatId } = req.params;
  const { expenseTracking } = req.body;
  console.log(chatId);
  console.log(expenseTracking);
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        expenseTracking,
      },
      { new: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json(updatedChat);
  } catch (error) {
    console.error('Error updating chat expense:', error);
    res.status(500).json({ message: 'Server error' });
  }
};