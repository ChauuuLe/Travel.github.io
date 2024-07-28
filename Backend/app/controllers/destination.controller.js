const fs = require('fs');
const path = require('path');
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
    const destination = await Destination.findById(req.params.destinationId).populate('author', 'username email');
    if (!destination) return res.status(404).send({ message: 'Destination not found' });

    res.json(destination);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.createDestination = async (req, res) => {
  const dataPath = path.join(__dirname, '../assets/countries_cities.json');
  const countryData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const { name, description, images, country, city, activities, averageCost, author } = req.body;

  const countryDetails = countryData.find(c => c.name === country || c.iso2 === country);

  const newDestination = new Destination({
    name,
    description,
    images,
    country,
    city,
    activities,
    averageCost,
    author,
    emoji: countryDetails ? countryDetails.emoji : ''
  });

  try {
    const savedDestination = await newDestination.save();
    res.status(201).json(savedDestination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCountries = (req, res) => {
  const dataPath = path.join(__dirname, '../assets/countries_cities.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Unable to read countries data' });
      return;
    }
    const countries = JSON.parse(data);
    res.status(200).send(countries.map(country => ({
      id: country.id,
      name: country.name,
      iso2: country.iso2
    })));
  });
};

exports.getCountryDetails = (req, res) => {
  const dataPath = path.join(__dirname, '../assets/countries_cities.json');
  const { countryIso } = req.params;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send({ message: 'Unable to read country details' });
      return;
    }
    const countries = JSON.parse(data);
    const country = countries.find(country => country.iso2 === countryIso);
    if (country) {
      res.status(200).send(country);
    } else {
      res.status(404).send({ message: 'Country not found' });
    }
  });
};

exports.getDestinationsByAuthor = async (req, res) => {
  try {
    const destinations = await Destination.find({ author: req.params.userId }).populate('author', 'username email');
    res.json(destinations);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

