const {
  getDestinations,
  getDestinationById,
  createDestination,
  getCountries,
  getCountryDetails
} = require('../controllers/destination.controller');
const { authJwt } = require("../middlewares/index.js");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept, x-access-token"
    );
    next();
  });

  app.get('/api/destinations', getDestinations);
  app.get('/api/destinations/:destinationId', getDestinationById);
  app.post('/api/destinations', createDestination);
  app.get('/api/countries', getCountries);
  app.get('/api/countries/:countryIso', getCountryDetails);
};
