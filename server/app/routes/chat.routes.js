const { authJwt } = require("../middleware");
const chatController = require("../controllers/chat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/chats", [authJwt.verifyToken], chatController.createChat);
  app.get("/api/chats", [authJwt.verifyToken], chatController.getChats);
};
