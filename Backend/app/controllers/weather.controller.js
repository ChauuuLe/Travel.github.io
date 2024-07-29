const axios = require('axios');
const env = require('dotenv');
env.config();

exports.pollution = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Unexpected status code: ${response.status}`);
      return res.status(response.status).json({ error: "Failed to fetch pollution data" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getting pollution data", error);
    res.status(500).json({ error: "Error fetching pollution data" });
  }
};

exports.uv = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Unexpected status code: ${response.status}`);
      return res.status(response.status).json({ error: "Failed to fetch UV data" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getting UV data", error);
    res.status(500).json({ error: "Error fetching UV data" });
  }
};

exports.fiveDay = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Unexpected status code: ${response.status}`);
      return res.status(response.status).json({ error: "Failed to fetch 5-day forecast" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getting 5-day forecast", error);
    res.status(500).json({ error: "Error fetching 5-day forecast" });
  }
};

exports.geocoded = async (req, res) => {
  try {
    const { search: city } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Unexpected status code: ${response.status}`);
      return res.status(response.status).json({ error: "Failed to fetch geocoded data" });
    }

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error in getting geocoded data", error);
    res.status(500).json({ error: "Error fetching geocoded data" });
  }
};

exports.weather = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Unexpected status code: ${response.status}`);
      return res.status(response.status).json({ error: `Error fetching weather data: ${response.statusText}` });
    }
    
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching weather data", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
