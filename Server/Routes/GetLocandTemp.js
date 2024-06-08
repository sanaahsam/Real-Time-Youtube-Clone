import express from "express";
import ipinfo from "ipinfo";

const getlocRouter = express.Router();

getlocRouter.get("/getloc", async (req, res) => {
  let locationString;
  let locationName;
  let temperatureKelvin;
  let temperatureCelsius;

  try {
    const data = await new Promise((resolve, reject) => {
      ipinfo((err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    locationString = data.loc;
    let [latitude, longitude] = locationString.split(",");

    if (latitude && longitude) {
      const weather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7a4ca931009612f4b69c7ba59cae7e2d`
      );

      const data = await weather.json();

      locationName = data.name; // Extracting location name
      temperatureKelvin = data.main.temp; // Temperature in Kelvin
      temperatureCelsius = temperatureKelvin - 273.15; // Converting Kelvin to Celsius
    }

    res.status(200).json({ locationName, temperatureCelsius });
    console.log(locationName, temperatureCelsius);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json(error);
  }
});

export default getlocRouter;
