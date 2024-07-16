const { authJwt } = require("../middlewares");
const controller = require("../controllers/chat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get("/api/chats/:chatId", [authJwt.verifyToken], controller.getChatInfo);
  app.post("/api/chats", [authJwt.verifyToken], controller.createGroup);
};
