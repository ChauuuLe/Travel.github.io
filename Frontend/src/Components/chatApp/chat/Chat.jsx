  import React, { useEffect, useRef, useState } from "react";
  import axios from "axios";
  import EmojiPicker from "emoji-picker-react";
  import io from "socket.io-client";
  import { useNavigate } from "react-router-dom";
  import Schedule from "../../schedule/schedule";
  import ExpenseTracking from "../../ExpenseTracking/ExpenseTracking";
  import { FaCalendar, FaMoneyBillAlt } from 'react-icons/fa';
  import "./chat.css";

  const socket = io(import.meta.env.VITE_BACKEND);

  const Chat = ({ chatId, setChatId }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedDates, setSelectedDates] = useState({});
    const [dates, setDates] = useState([]);
    const endRef = useRef(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [scheduleOpen, setScheduleOpen] = useState(false);
    const [initialSelectedDates, setInitialSelectedDates] = useState({});
    const [expenseTracking, setExpenseTracking] = useState([]);
    const [expenseTrackingOpen, setExpenseTrackingOpen] = useState(false);
    const [initialExpenseTracking, setInitialExpenseTracking] = useState({});
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
        setMembers(response.data.members);

        const calendar = response.data.calendar[0] || {};
        setSelectedDates(calendar);
        setInitialSelectedDates(calendar);
    
        const newDates = Array.from(new Set(
          Object.values(calendar).flatMap(dates => Object.keys(dates))
        ));
        setDates(newDates);
        
        setExpenseTracking(response.data.expenseTracking);
        setInitialExpenseTracking(response.data.expenseTracking);
      } catch (err) {
        console.error('Error fetching chat', err);
      }
    };

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

    const handleScheduleUpdate = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${import.meta.env.VITE_BACKEND}/api/chats/${chatId}/schedule`,
          { calendar: selectedDates },
          {
            headers: { 'x-access-token': token },
          }
        );
        setScheduleOpen(false);
        fetchChat();
      } catch (err) {
        console.error("Failed to update schedule:", err);
      }
    };

    const handleExpenseTrackingUpdate = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `${import.meta.env.VITE_BACKEND}/api/chats/${chatId}/expenseTracking`,
          { expenseTracking },
          {
            headers: { 'x-access-token': token },
          }
        );
        setExpenseTrackingOpen(false);
        fetchChat();
      } catch (err) {
        console.error("Failed to update expense tracking:", err);
      }
    };

    const onDataChangeDates = (newDates) => {
      setDates(newDates);
    };

    const onDataChangeSelectedDates = (updatedDates) => {
      setSelectedDates(updatedDates);
    };

    const onDataChangeExpenseTracking = (updatedExpenses) => {
      setExpenseTracking(updatedExpenses);
    };

    const hasChangesSchedule = JSON.stringify(selectedDates) !== JSON.stringify(initialSelectedDates);
    const hasChangesExpenseTracking = JSON.stringify(expenseTracking) !== JSON.stringify(initialExpenseTracking);

    return (
      <div className="chat custom-chat-background">
        <div className="top">
          <div className="userd">
            <div className="texts">
              <span className="group-name">{chat?.groupName}</span>
            </div>
            <div className="buttons">
              <button onClick={() => setScheduleOpen(true)}>
                <FaCalendar className="icon" /> Schedule
              </button>
              <button onClick={() => setExpenseTrackingOpen(true)}>
                <FaMoneyBillAlt className="icon" /> Expenses
              </button>
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

        {scheduleOpen && (
          <div className="schedule-modal">
            <div className="schedule-content">
              <h2>Schedule</h2>
              <Schedule
                members={members}
                selectedDates={selectedDates}
                dates={dates}
                onDataChangeDates={onDataChangeDates}
                onDataChangeSelectedDates={onDataChangeSelectedDates}
              />
              <div className="button-container">
                <button className="confirm-button" onClick={handleScheduleUpdate} disabled={!hasChangesSchedule}>Confirm</button>
                <button className="cancel-button" onClick={() => setScheduleOpen(false)}>Cancel</button>
              </div>
            </div>
          </div>

      
        
        )}

        {expenseTrackingOpen && (
          <div className="expense-modal">
            <div className="expense-content">
              <ExpenseTracking
                expenseTracking={expenseTracking}
                members={members}
                onDataChangeExpenseTracking={onDataChangeExpenseTracking}
              />
              <button onClick={handleExpenseTrackingUpdate} disabled={!hasChangesExpenseTracking}>Confirm</button>
              <button onClick={() => setExpenseTrackingOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Chat;
