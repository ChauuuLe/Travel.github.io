const controller = require('../controllers/destination.controller');
const { authJwt } = require("../middlewares/index.js");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get('/api/destinations', controller.getDestinations);
  app.get('/api/destinations/:destinationId', controller.getDestinationById);
  app.post('/api/destinations', controller.createDestination);
  app.get('/api/countries', controller.getCountries);
  app.get('/api/countries/:countryIso', controller.getCountryDetails);
  app.get('/api/users/:userId/destinations', controller.getDestinationsByAuthor);
};
