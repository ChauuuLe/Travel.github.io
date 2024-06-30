import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import "./chat.css";

const Chat = ({ chatId }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (chatId) {
      const fetchChat = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:8080/api/chats/${chatId}`, {
            headers: {
              'x-access-token': token,
            },
          });
          setChat(response.data);
          setMessages(response.data.messages); // Set messages from chat data
        } catch (err) {
          console.error('Error fetching chat', err);
        }
      };
      fetchChat();
    }
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        "/api/messages",
        { 
          message: text, 
          sender: currentUser._id,
          chatId: chatId,
        },
        {
          headers: { 'x-access-token': token },
        }
      );
      setMessages([...messages, { sender: currentUser, text, createdAt: new Date() }]);
      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const renderAvatar = (avatar) => {
    return avatar || "./assets/avatar.png";
  };

  const renderMessages = (messages) => (
    messages.map((msg, index) => (
      <div key={index} className={`message ${msg.sender._id === currentUser._id ? "own" : ""}`}>
        <img src={renderAvatar(msg.sender.avatar)} alt="avatar" />
        <div className="texts">
          <p>{msg.text}</p>
          <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    ))
  );

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={renderAvatar(currentUser.avatar)} alt="avatar" />
          <div className="texts">
            <span>{currentUser.username}</span>
            <p>Online</p>
          </div>
        </div>
        <div className="icons">
          <img src="./assets/phone.png" alt="" />
          <img src="./assets/video.png" alt="" />
          <img src="./assets/info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {renderMessages(messages)}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./assets/img.png" alt="" />
          <img src="./assets/camera.png" alt="" />
          <img src="./assets/mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="./assets/emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            {open && <EmojiPicker onEmojiClick={handleEmoji} />}
          </div>
        </div>
        <button className="sendButton" onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
