const express = require("express");
const cors = require("cors");
const CookieSession = require("cookie-session");
const app = express();
const path = require("path");
const crypto = require("crypto");
const next = require("next");
// Next.js setup
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: path.join(__dirname, '../service/weatherforecast') });
const handle = nextApp.getRequestHandler();

//keys just for testing
const key1 = "248bgturng8n54gh54g94gh95gh59gh498gher9ifjdoigdsgpoasdngiphgipghighr9igheiugheriuogheruigneriugerig";
const key2 = "sduoygberufnisdnfndvdfnvjisrngijnfdsigniuenrgin3498tgerhfusdgasdokfbabgodsfoisdnnosdfn";
const key3 = "rfewsdvcnxhjkw4923e32merfdvucxinjk345345et4rvdxicnkergdsvxcngcewsdfjvcxsdzfsdfgdfgdf";
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CookieSession({
  name: 'session',
  keys: [key1, key2, key3],
  httpOnly: true,
  maxAge: 2 * 60 * 60 * 1000, // 2 hours
}));


// route

require('./routes/auth.routes.js')(app);
require('./routes/user.routes.js')(app);
require('./routes/group.routes.js')(app);
require('./routes/chat.routes.js')(app);



// DB
const db = require("./models/index.js");
const Role = db.role;
const dbConfig = require("./config/db.config.js");
const linkToMongoDB = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;


db.mongoose.connect(linkToMongoDB, {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
})
  .then(() => {
    console.log("Successfully connect to MongoDB.");
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
      console.log("added 'user' to roles collection");

      await new Role({ name: "moderator" }).save();
      console.log("added 'moderator' to roles collection");

      await new Role({ name: "admin" }).save();
      console.log("added 'admin' to roles collection");
    }
  } catch (err) {
    console.log("error", err);
  }
}



  // Port
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });


