const { authJwt } = require("../middlewares/index.js");
const controller = require("../controllers/user.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get(
    "/api/users/search",
    [authJwt.verifyToken],  // Ensure that only authenticated users can search for users
    controller.searchUsers
  );

  app.get(
    "/api/users/current",
    [authJwt.verifyToken],  // Ensure that only authenticated users can get current user info
    controller.getCurrentUser
  );

  app.put(
    "/api/users/current",
    [authJwt.verifyToken],
    controller.updateCurrentUser
  );

  app.get(
    "/api/users/:userId/chats",
    [authJwt.verifyToken],
    controller.getUserChats
  );
};
