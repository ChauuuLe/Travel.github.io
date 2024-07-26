const { getJson } = require("serpapi");
const env = require("dotenv");
env.config();

exports.getHotels = async (req, res) => {
  const { destination, checkIn, checkOut, adults } = req.query;

  // Check for missing query parameters
  if (!destination || !checkIn || !checkOut || !adults) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const params = {
    engine: "google_hotels",
    q: destination,
    vacation_rentals: "true",
    check_in_date: checkIn,
    check_out_date: checkOut,
    adults: adults,
    currency: "USD",
    gl: "us",
    hl: "en",
    api_key: process.env.SERPAPI_KEY,
  };

  try {
    getJson(params, (json) => {
      if (json.error) {
        return res.status(400).json({ error: json.error });
      }

      if (json.properties && json.properties.length > 0) {
        res.status(200).json({ properties: json.properties });
      } else {
        res.status(200).json({ not_found: 'No hotels found' });
      }
    });
  } catch (error) {
    console.error('Error fetching hotel data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
