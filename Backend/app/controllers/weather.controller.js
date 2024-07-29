exports.pollution = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const result = (await fetch(url)).json();
    res.status(200).send(result);
  } catch (error) {
    console.error("Error in getting pollusion data ", error);
    return res.status(500).send("Error");
  }
}

exports.uv = async (req, res) => {
  try {
    const searchParams = req.query;
    const lat = searchParams.lat;
    const lon = searchParams.lon;

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const result = await (fetch(url, {
      next: { revalidate: 900 },
    }));
    res.status(200).send(result.json());
  } catch (error) {
    console.error("Error in getting uv data ", error);
    return res.status(500).send("Error");
  }
}
