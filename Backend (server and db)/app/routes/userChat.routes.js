const { authJwt } = require("../middlewares");
const controller = require("../controllers/userChat.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  //app.get("/api/users/:userId/chats", [authJwt.verifyToken], controller.getUserChats);
};
