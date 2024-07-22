// controllers/destination.controller.js
const Destination = require('../models/destination.model');

exports.getDestinations = async (req, res) => {
    try {
        const destinations = await Destination.find().populate('author', 'username email');
        res.json(destinations);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getDestinationById = async (req, res) => {
    try {
        const destination = await Destination.findById(req.params.id).populate('author', 'username email');
        if (!destination) return res.status(404).send({ message: 'Destination not found' });

        res.json(destination);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.createDestination = async (req, res) => {
    const { name, description, image, region, activities, averageCost, authorId } = req.body;

    if (!authorId) {
        return res.status(400).send({ message: 'Author ID is required' });
    }

    const newDestination = new Destination({
        name,
        description,
        image,
        region,
        activities,
        averageCost,
        author: authorId
    });

    try {
        const savedDestination = await newDestination.save();
        res.status(201).json(savedDestination);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
