document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");  
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorDisplay = document.getElementById("error-message");

   // ⚠️ IMPORTANT: Replace this placeholder with your real API key 
  const API_KEY = "YOUR_API_KEY_HERE"; 

  getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const weatherData = await fetchWeatherData(city);
    displayWeatherData(weatherData);
  } catch (err) {
    console.error(err);
    showError();
  }
});

async function fetchWeatherData(city) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`City not found (status: ${response.status})`);
  }
  const data = await response.json();
  return data;
}

function displayWeatherData(data) {
  // Use the correct response structure
  const { location, current } = data;

  cityNameDisplay.textContent = location.name;
  temperatureDisplay.textContent = `Temperature: ${current.temp_c} °C`;
  descriptionDisplay.textContent = `Weather: ${current.condition.text}`;

  weatherInfo.classList.remove("hidden");
  errorDisplay.classList.add("hidden");
}

function showError() {
  weatherInfo.classList.add("hidden");
  errorDisplay.classList.remove("hidden");
  errorDisplay.textContent = "Could not fetch data. Please try again.";
}

});