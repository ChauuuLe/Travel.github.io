const { authJwt } = require("../middlewares");
const controller = require("../controllers/message.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.post("/api/messages", [authJwt.verifyToken], controller.createMessage);
};
