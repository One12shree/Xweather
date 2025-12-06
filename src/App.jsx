import React, { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "9678ae0b98104d96b41190527250512";

  const fetchWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}`
      );

      const data = await response.json();

      if (data.error) {
        setError("Invalid city");
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") fetchWeather();
  };

  return (
    <div className="app-container">
      <div className="search-bar">
        <input
          data-testid="city-input"
          type="text"
          placeholder="Enter city"
          value={city}
          onKeyDown={handleKey}
          onChange={(e) => setCity(e.target.value)}
        />

        <button data-testid="search-button" onClick={fetchWeather}>
          Search
        </button>
      </div>

      {loading && <p data-testid="loading-text">Loading...</p>}

      {error && <p data-testid="error-text">{error}</p>}

      {weather && (
        <div data-testid="weather-container" className="weather-cards">
          <div className="weather-card" data-testid="temp">
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>

          <div className="weather-card" data-testid="humidity">
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>

          <div className="weather-card" data-testid="condition">
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="weather-card" data-testid="wind">
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
