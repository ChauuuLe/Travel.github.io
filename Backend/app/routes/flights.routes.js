const {
    getFlights,
  } = require('../controllers/flights.controller');
  
  module.exports = (app) => {
    app.use(function (req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept, x-access-token"
      );
      next();
    });
    app.get('/api/flights', getFlights);
  };
  