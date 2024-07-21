const Message = require('../models/message.model');
const Chat = require('../models/chat.model');

exports.createMessage = async (req, res) => {
  try {
    const { sender, chatId, text } = req.body;

    const newMessage = new Message({
      sender,
      chat: chatId,
      text: text
    });

    const savedMessage = await newMessage.save();

    // Update the last message in the chat
    await Chat.findByIdAndUpdate(chatId, { lastMessage: savedMessage._id });

    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
