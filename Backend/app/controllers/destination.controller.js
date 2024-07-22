const Destination = require('../models/destination.model');
const Activity = require('../models/activity.model');

exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        res.json(destinations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) return res.status(404).send({ message: 'Destination not found' });

        const activities = await Activity.find({ destinationId: destination._id });
        const averageCost = activities.reduce((sum, activity) => sum + activity.cost, 0) / activities.length;

        res.json({ ...destination.toObject(), activities, averageCost });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
