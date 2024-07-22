const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    name: String,
    cost: Number
});

const destinationSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    region: String,
    activities: [activitySchema],
    averageCost: Number
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
