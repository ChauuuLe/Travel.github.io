const Destination = require('../models/destination.model');

exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find();
        console.log(destinations);
        res.json(destinations);
    } catch (err) {
        res.status(200).send({ message: err.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id);
        if (!destination) return res.status(404).send({ message: 'Destination not found' });

        res.json(destination);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};
