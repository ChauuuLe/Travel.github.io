const express = require("express");
const cors = require("cors");
const CookieSession = require("cookie-session");
const http = require("http");
const socketIo = require("socket.io");
const env = require("dotenv");
env.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.frontEndDomain,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "x-access-token"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const key1 = process.env.KEY1;
const key2 = process.env.KEY2;
const key3 = process.env.KEY3;

app.use(CookieSession({
  name: 'session',
  keys: [key1, key2, key3],
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
}));

// Routes
require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/chat.routes.js')(app);
require('./routes/message.routes.js')(app);
require('./routes/destination.routes.js')(app);
require('./routes/hotels.routes.js')(app);
require('./routes/flights.routes.js')(app);
require('./routes/service.routes.js')(app);

// Database setup
const db = require("./models/index.js");
const Chat = db.chat;
const Role = db.role;
const User = db.user;
const linkToMongoDB = process.env.mongoUrl;

db.mongoose.connect(linkToMongoDB, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count === 0) {
      await new Role({ name: "user" }).save();
      console.log("Added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("Added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("Added 'admin' to roles collection");
    }
  } catch (err) {
    console.log("Error", err);
  }
}

// Socket.IO logic
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinChat', (chatId) => {
    socket.join(chatId);
    console.log(`Client joined chat ${chatId}`);
  });

  socket.on('sendMessage', async ({ chatId, message }) => {
    try {
      // Fetch full user details
      const user = await User.findById(message.sender);
  
      // Populate sender details in the message
      const fullMessage = {
        ...message,
        sender: {
          _id: user._id,
          username: user.username,
          avatar: user.avatar,
        }
      };
  
      // Save the message to the database
      const chat = await Chat.findById(chatId);
      chat.messages.push(fullMessage);
      chat.lastMessage = fullMessage;
      await chat.save();
  
      // Emit the full message object to the clients
      io.to(chatId).emit('message', fullMessage);
      io.emit('updateChatList');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
