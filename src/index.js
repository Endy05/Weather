import './style.css';
import './stars.js'; // Added to attach stars.js

const apiKey = '204518349bfd95a96e4aa5f68bc037d4';

// Add mapping for country codes to full names
const countryMap = {
    'UA': 'Ukraine',
    'US': 'United States',
    'GB': 'United Kingdom',
    'DE': 'Germany',
    'FR': 'France',
    // ...add more mappings as needed
};

// Global DOM element references
let cityEl, tempEl, feelsEl, humidityEl, windEl;

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.cod && Number(data.cod) !== 200) {
            throw new Error(data.message || 'Error fetching weather data');
        }
        if (!data.name || !data.sys || !data.main || !data.wind) {
            throw new Error('Incomplete weather data');
        }
        // Get full country name if available
        const fullCountry = countryMap[data.sys.country] || data.sys.country;
        // Update DOM: combine city and full country name
        cityEl.textContent = `${data.name}, ${fullCountry}`;
        // Temperature: show value only with °C
        tempEl.textContent = `${Math.round(data.main.temp)}°C`;
        feelsEl.textContent = `Feels like: ${Math.round(data.main.feels_like)}°C`;
        windEl.textContent = `Wind: ${data.wind.speed} m/s`;
        humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found or error occurred');
    }
}

function init() {
    // Cache DOM elements once the document is ready.
    cityEl = document.getElementById('city');
    tempEl = document.getElementById('temperature');
    feelsEl = document.getElementById('feels-like');
    humidityEl = document.getElementById('humidity');
    windEl = document.getElementById('wind');

    const cityForm = document.getElementById('cityForm');
    if (cityForm) {
        cityForm.addEventListener('submit', async event => {
            event.preventDefault();
            const city = document.getElementById('cityInput').value;
            if (city) {
                await getWeather(city);
            }
        });
    }
    // Initial weather display for Kyiv
    getWeather('Kyiv');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


