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

const key1 = "248bgturng8n54gh54g94gh95gh59gh498gher9ifjdoigdsgpoasdngiphgipghighr9igheiugheriuogheruigneriugerig";
const key2 = "sduoygberufnisdnfndvdfnvjisrngijnfdsigniuenrgin3498tgerhfusdgasdokfbabgodsfoisdnnosdfn";
const key3 = "rfewsdvcnxhjkw4923e32merfdvucxinjk345345et4rvdxicnkergdsvxcngcewsdfjvcxsdzfsdfgdfgdfgdfgdfgdf";

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

// Database setup
const db = require("./models/index.js");
const Chat = db.chat;
const Role = db.role;
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
      const chat = await Chat.findById(chatId).populate('messages');
      chat.messages.push(message);
      chat.lastMessage = message;
      await chat.save();

      io.to(chatId).emit('message', message);
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
