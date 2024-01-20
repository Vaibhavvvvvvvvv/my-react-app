import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  const [cityName, setCityName] = useState('');
  const [weatherDescription, setWeatherDescription] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=6bcf6c9630948de1fc78a46cd3afc611`)
      .then(response => response.json())
      .then(data => {
        console.log(data.weather[0].description);
        setWeatherDescription(data.weather[0].description);

        // Set background image based on weather description
        setBackgroundImage(getBackgroundImage(data.weather[0].description));
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  const getBackgroundImage = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'clear':
        return 'https://media1.tenor.com/images/b5d87317c9a1df50e85585e0b37cdf7e/tenor.gif?itemid=17342806';
      case 'clouds':
        return '/images/cloudy.jpg';
      default:
        return 'https://media1.tenor.com/images/b5d87317c9a1df50e85585e0b37cdf7e/tenor.gif?itemid=17342806';
    }
  };

  useEffect(() => {
    // Set a default background image when the component mounts
    setBackgroundImage('https://www.wallpaperup.com/uploads/wallpapers/2014/03/02/283302/50e39353afa18155983f891d806e0c6d-700.jpg');
  }, []);

  return (
    <div className="container mt-5" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Weather App</h1>
              <div className="input-group mb-3">
                <input
                  type="text"
                  id="cityName"
                  className="form-control"
                  placeholder="Enter city name"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                />
                <button
                  id="getWeather"
                  className="btn btn-primary"
                  onClick={getWeather}
                >
                  Get Weather
                </button>
              </div>
              <div className="text-center">
                {weatherDescription && (
                  <h2 className="mt-4">Weather: {weatherDescription}</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
