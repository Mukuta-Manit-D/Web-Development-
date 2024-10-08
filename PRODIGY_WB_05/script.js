// Replace with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

// Get elements
const cityName = document.getElementById('cityName');
const weatherDescription = document.getElementById('weatherDescription');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const locationInput = document.getElementById('locationInput');
const searchBtn = document.getElementById('searchBtn');
const getLocationBtn = document.getElementById('getLocationBtn');

// Fetch weather by city name
async function getWeatherByCity(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    if (data.cod === 200) {
        displayWeather(data);
    } else {
        alert('City not found');
    }
}

// Fetch weather by geolocation (latitude and longitude)
async function getWeatherByLocation(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    displayWeather(data);
}

// Display weather information on the page
function displayWeather(data) {
    cityName.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Get weather for user-inputted city
searchBtn.addEventListener('click', () => {
    const city = locationInput.value;
    if (city) {
        getWeatherByCity(city);
    } else {
        alert('Please enter a city name');
    }
});

// Get weather for user's current location
getLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeatherByLocation(lat, lon);
        }, () => {
            alert('Unable to retrieve location');
        });
    } else {
        alert('Geolocation is not supported by this browser');
    }
});
