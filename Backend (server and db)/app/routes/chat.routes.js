const { authJwt } = require("../middlewares/index.js");
const controller = require("../controllers/chat.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  //app.get("/api/chats/:chatId", [authJwt.verifyToken], controller.getChatInfo);
  app.post("/api/chats", [authJwt.verifyToken], controller.createChat);
};
