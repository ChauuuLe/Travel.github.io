const express = require("express");
const {
    getHotels,
} = require('../controllers/hotels.controller');

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept, x-access-token"
        );
        next();
    });
    app.get('/api/hotels', getHotels);
};
