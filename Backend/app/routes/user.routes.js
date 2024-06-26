const { authJwt } = require("../middlewares/index.js");
const controller = require("../controllers/user.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get(
    "/api/users/search",
    controller.searchUsers
  );

  app.get(
    "/api/users/current",
    controller.getCurrentUser
  );
  app.get(
    "/api/users/:userId/chats", 
    [authJwt.verifyToken], 
    controller.getUserChats
  );
};
