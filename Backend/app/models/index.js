const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model.js");
db.role = require("./role.model.js");
db.chat = require("./chat.model.js");
db.userChat = require("./userChat.model.js");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;