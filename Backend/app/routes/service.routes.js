const { authJwt } = require("../middlewares");
const controller = require("../controllers/weather.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get("/api/pollution", controller.pollution);
  app.get("/api/uv", controller.uv);
  app.get("/api/fiveday", controller.uv);
  app.get("/api/geocoded", controller.geocoded);
  app.get("/api/weather", controller.weather);
};
