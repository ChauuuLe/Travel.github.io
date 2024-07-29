exports.pollution = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;
    console.log('polu');
    console.log(lat);
    console.log(lon);
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const result = await fetch(url);
    console.log('polu');
    res.status(200).send(result.data);
  } catch (error) {
    console.error("Error in getting pollusion data ", error);
    return res.status(500).send("Error");
  }
};

exports.uv = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const result = await (fetch(url, {
      next: { revalidate: 900 },
    }));
    console.log('uv');
    res.status(200).send(result.json());
  } catch (error) {
    console.error("Error in getting uv data ", error);
    return res.status(500).send("Error");
  }
};

exports.fiveDay = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const dailyUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const dailyRes = await fetch(dailyUrl, {
      next: { revalidate: 3600 },
    });
    console.log('55');
    const dailyData = await dailyRes.json();
    res.status(200).send(dailyData);
  } catch (error) {
    console.error("Error in getting weather 5-day data ", error);
    return res.status(500).send("Error");
  }
};

exports.geocoded = async (req, res) => {
  try {
    const searchParams = req.query;
    const city = searchParams.search;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    const result = await fetch(url);
    console.log('geo');
    res.status(200).send(result.data);
  } catch (error) {
    console.error("Error in getting weather geocoded data ", error);
    return res.status(500).send("Error");
  }
};

exports.weather = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const result = await fetch(url);
    console.log('we');
    res.status(200).send(result.data);
  } catch (error) {
    console.error("Error in getting weather weather data ", error);
    return res.status(500).send("Error");
  }
};