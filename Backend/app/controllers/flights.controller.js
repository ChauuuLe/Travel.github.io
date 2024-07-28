const { getJson } = require("serpapi");
const env = require("dotenv");
env.config();

exports.getFlights = async (req, res) => {
  const { arrival, departure, startDate, returnDate } = req.query;

  const params = {
    engine: "google_flights",
    departure_id: departure,
    arrival_id: arrival,
    outbound_date: startDate,
    return_date: returnDate,
    currency: "USD",
    hl: "en",
    api_key: process.env.SERPAPI_KEY,
  };

  try {
    getJson(params, (json) => {
      if (json.error) {
        return res.status(400).json({ error: json.error });
      }

      if (json.best_flights && json.best_flights.length > 0) {
        res.status(200).json({ best_flights: json.best_flights });
      } else {
        res.status(200).json({ not_found: 'No flights found' });
      }
    });
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
