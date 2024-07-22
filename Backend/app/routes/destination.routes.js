const { getDestinations, getDestinationById } = require('../controllers/destination.controller');

module.exports = (app) => {
    app.get('/api/destinations', getDestinations);
    app.get('/api/destinations/:id', getDestinationById);
};
