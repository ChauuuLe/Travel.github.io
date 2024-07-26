import { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import io from "socket.io-client";
import "./chat.css"; // Ensure this CSS file contains styles specific to the Chat component
import { useNavigate } from "react-router-dom";

const socket = io(import.meta.env.VITE_BACKEND); // Adjust the backend URL

const Chat = ({ chatId, setChatId }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("chat-page");
    return () => {
      document.body.classList.remove("chat-page");
    };
  }, []);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
    if (!user) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (chatId) {
      socket.emit('joinChat', chatId);

      const fetchChat = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/chats/${chatId}`, {
            headers: {
              'x-access-token': token,
            },
          });
          setChat(response.data);
          setMessages(response.data.messages);
        } catch (err) {
          console.error('Error fetching chat', err);
        }
      };
      fetchChat();
    }
  }, [chatId]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.emit('updateChatList');
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSendMessage = async () => {
    if (text.trim() === "") return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/messages`,
        {
          text,
          sender: currentUser._id,
          chatId,
        },
        {
          headers: { 'x-access-token': token },
        }
      );
      const message = response.data;
      socket.emit('sendMessage', { chatId, message });
      setText("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderAvatar = (avatar) => {
    return avatar || "./assets/avatar.png";
  };

  const renderMessages = (messages) => (
    messages.map((msg, index) => (
      <div key={index} className={`message ${msg.sender._id === currentUser?._id ? "own" : ""}`}>
        <img src={renderAvatar(msg.sender.avatar)} alt="avatar" />
        <div className="texts">
          <span className="sender-name">{msg.sender.username}</span>
          <p>{msg.text}</p>
          <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    ))
  );

  return (
    <div className="chat custom-chat-background">
      <div className="top">
        <div className="user">
          <div className="texts">
            <span>{chat?.groupName}</span>
          </div>
        </div>
      </div>
      <div className="center">
        {renderMessages(messages)}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="emoji">
          <img src="./assets/emoji.png" alt="" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            {open && <EmojiPicker onEmojiClick={handleEmoji} />}
          </div>
        </div>
        <button className="sendButton" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
