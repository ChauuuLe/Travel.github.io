const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    name: String,
    description: String,
    cost: Number,
    destinationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
});

const Activity = mongoose.model('Activity', ActivitySchema);
module.exports = Activity;
