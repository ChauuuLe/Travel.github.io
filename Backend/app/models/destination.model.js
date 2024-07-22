const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

const Destination = mongoose.model('Destination', DestinationSchema);
module.exports = Destination;
