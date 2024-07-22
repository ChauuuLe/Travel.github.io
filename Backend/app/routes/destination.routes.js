// routes/destination.routes.js
const { getDestinations, getDestinationById, createDestination } = require('../controllers/destination.controller');

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept, x-access-token"
        );
        next();
    });

    app.get('/api/destinations', getDestinations);
    app.get('/api/destinations/:id', getDestinationById);
    app.post('/api/destinations', createDestination);
};
