import React, { Component } from "react";
import axios from "axios";
import './Weather.css'

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      weather: null,
      forecast: []
    };
  }

  fetchWeather = async () => {
    const API_KEY = "448fbfc19eb64dd2ae14bdcc0bcf03eb";
    const weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=${API_KEY}`;
    const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=${API_KEY}`;

    try {
      const weatherResponse = await axios.get(weatherURL);
      const forecastResponse = await axios.get(forecastURL);

      const dailyForecast = forecastResponse.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")  // dt.txt comes from the forecast API json file
      );

      this.setState({ 
        weather: weatherResponse.data,
        forecast: dailyForecast
       });
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.setState({ city: "Toronto" }, () => this.fetchWeather()); // Default city is Toronto
  }

  render() {
    const { weather, forecast } = this.state;
  
    return (
      <div className="weather-container">
        <h2>Weather App</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city"
            value={this.state.city}
            onChange={(e) => this.setState({ city: e.target.value })}
          />
          <button onClick={this.fetchWeather}>Search</button>
        </div>
        {weather && (
          <>
            <div className="weather-details">
              <div className="weather-main">
                <h3>
                  {weather.name}, {weather.sys.country}
                </h3>
                <p>{new Date().toLocaleDateString()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <h1>{(weather.main.temp - 273.15).toFixed(2)}°C</h1>
                <p>{weather.weather[0].description}</p>
              </div>
              <div className="weather-extra">
                <p><strong>Feels Like:</strong> {(weather.main.feels_like - 273.15).toFixed(2)}°C</p>
                <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                <p><strong>Pressure:</strong> {weather.main.pressure} hPa</p>
                <p><strong>Visibility:</strong> {weather.visibility / 1000} km</p>
                <p>
                  <strong>Sunrise:</strong>{" "}
                  {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Sunset:</strong>{" "}
                  {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
  
            <div className="forecast-container">
              <h3>5-Day Forecast</h3>
              <div className="forecast-grid">
                {forecast.map((day) => (
                  <div className="forecast-card" key={day.dt}>
                    <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                    <img
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                    />
                    <p>{(day.main.temp - 273.15).toFixed(2)}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}