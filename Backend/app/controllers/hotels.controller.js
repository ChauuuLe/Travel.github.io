const { getJson } = require("serpapi");

exports.getHotels = async (req, res) => {
    const { destination, check_in_date, check_out_date, adults } = req.query;

    if (!destination || !check_in_date || !check_out_date || !adults) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        getJson({
            engine: "google_hotels",
            q: destination,
            check_in_date: check_in_date,
            check_out_date: check_out_date,
            adults: adults,
            currency: "USD",
            gl: "us",
            hl: "en",
            api_key: process.env.SERPAPI_KEY
        }, (json) => {
            if (json.error) {
                return res.status(400).json({ error: json.error });
            }

            if (json.hotels_results && json.hotels_results.length > 0) {
                const hotels = json.hotels_results.map(hotel => ({
                    name: hotel.title,
                    price: hotel.price,
                    rating: hotel.rating,
                    address: hotel.address,
                    url: hotel.link
                }));
                res.json({ hotels });
            } else {
                res.status(404).json({ error: 'No hotels found' });
            }
        });
    } catch (error) {
        console.error('Error fetching hotel data:', error);
        res.status(500).json({ error: 'Error fetching hotel data' });
    }
};
