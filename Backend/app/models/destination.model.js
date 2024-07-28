const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: String,
  cost: Number,
  image: String
});

const destinationSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  country: String,
  city: String,
  activities: [activitySchema],
  averageCost: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
