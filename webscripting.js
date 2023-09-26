let is12HourFormat = true;
let is24HourFormat = false;
function updateClock() {
    const clockElement = document.querySelector('.clock-text');
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    let ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM/PM

    if (!is12HourFormat) {
        // Use 24-hour format
        hours = hours.toString().padStart(2, '0');
        ampm = ''; // Clear AM/PM for 24-hour format
    } else {
        // Use 12-hour format
        if (hours > 12) {
            hours -= 12;
        }

        if (hours === 0) {
            hours = 12;
        }

        hours = hours.toString().padStart(2, '0');
    }

    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockElement.textContent = timeString;
}




updateClock();
setInterval(updateClock, 1000);

function changeTimeFormat() {
    const selectedFormat = document.getElementById('time-format-select').value;
    
    if (selectedFormat === '12') {
        // Set 12-hour format
        is12HourFormat = true;
    } else {
        // Set 24-hour format
        is12HourFormat = false;
        updateClock(); // Add this line to update the clock immediately
    }

    // Update the clock immediately (move this line to the 24-hour block if you want)
    updateClock();
}

// Global variable to track temperature units
let isCelsius = false; // Initially set to Fahrenheit

// Function to toggle between Celsius and Fahrenheit
function toggleTemperatureUnits() {
isCelsius = !isCelsius; // Toggle the units
const toggleButton = document.getElementById('toggle-units');

if (isCelsius) {
    // Switch to Celsius
    toggleButton.textContent = 'Change to Fahrenheit';
    // Call a function to convert and update temperatures to Celsius
    convertAndDisplayTemperaturesToCelsius();
} else {
    // Switch to Fahrenheit
    toggleButton.textContent = 'Change to Celsius';
    // Call a function to convert and update temperatures to Fahrenheit
    convertAndDisplayTemperaturesToFahrenheit();
}
}

function convertAndDisplayTemperaturesToCelsius() {
const temperatureElements = document.querySelectorAll('.temperature');

temperatureElements.forEach((element) => {
    const temperatureInFahrenheit = parseFloat(element.getAttribute('data-temperatureFahrenheit'));
    const temperatureInCelsius = Math.round((temperatureInFahrenheit - 32) * (5 / 9)); // Round to the nearest whole number
    element.textContent = `Temperature: ${temperatureInCelsius} °C`;
});
}

function convertAndDisplayTemperaturesToFahrenheit() {
const temperatureElements = document.querySelectorAll('.temperature');

temperatureElements.forEach((element) => {
    const temperatureInCelsius = parseFloat(element.getAttribute('data-temperatureCelsius'));
    const temperatureInFahrenheit = Math.round((temperatureInCelsius * 9 / 5) + 32); // Round to the nearest whole number
    element.textContent = `Temperature: ${temperatureInFahrenheit} °F`;
});
}


function getUserLocation() {
    return fetch('https://ipinfo.io?token=cc98be8f188a9a')
        .then(response => response.json())
        .then(data => {
        const locationArray = data.loc.split(',');
        const city = data.city;
        const country = data.country;

        return { city, country };
        })
        .catch(error => {
            console.error('Error getting user location:', error);
            return null;
        });
}

function updateWeather(city, country) {
const weatherElement = document.querySelector('.weather');
const cityElement = document.querySelector('.city-text');
const apiKey = "c152eb69aece48a8817210931232509"; // Replace with your actual WeatherAPI API key
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.current) {
            const temperatureFahrenheit = Math.round(data.current.temp_f);
            const temperatureCelsius = Math.round(data.current.temp_c);

            // Store both Fahrenheit and Celsius temperatures in data attributes
            weatherElement.innerHTML = `<h3 class="temperature" data-temperatureFahrenheit="${temperatureFahrenheit}" data-temperatureCelsius="${temperatureCelsius}">Temperature: ${temperatureFahrenheit} °F</h3>`;
            cityElement.innerHTML = `<h3>Location: ${city}, ${country}</h3>`;
        } else {
            console.error('Error fetching weather data: Invalid API response');
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}

getUserLocation().then(location => {
if (location) {
    updateWeather(location.city, location.country);
} else {
    console.error('Unable to determine user location.');
}
});

setInterval(() => {
getUserLocation().then(location => {
    if (location) {
        updateWeather(location.city, location.country);
    } else {
        console.error('Unable to determine user location.');
    }
});
}, 1800000);


// Function to open the settings modal
function openSettingsModal() {
const modal = document.getElementById('settings-modal');
modal.style.display = 'block';
}

// Function to close the settings modal
function closeSettingsModal() {
const modal = document.getElementById('settings-modal');
modal.style.display = 'none';
}

// Function to change the city and update time, weather, and location
function changeCity() {
const newCity = document.getElementById('new-city').value;
if (newCity) {
    // Close the modal
    closeSettingsModal();

    // Update the city in the UI
    const cityElement = document.querySelector('.city-text');
    cityElement.innerHTML = `<h3>Location: ${newCity}</h3>`;

    // Fetch weather and time for the new city (you'll need to modify your code)
    // Example: getUserLocation().then(location => updateWeatherAndTime(newCity, location.country));
}
}
function changeCity() {
const newCity = document.getElementById('new-city').value;
if (newCity) {
    // Close the modal
    closeSettingsModal();

    // Fetch weather data for the new city
    fetchWeather(newCity);
}

function fetchWeather(city) {
const apiKey = "c152eb69aece48a8817210931232509"; // Replace with your actual WeatherAPI API key
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.current) {
            const temperature = Math.round(data.current.temp_f);
            const description = data.current.condition.text;

            // Update the temperature in the UI
            const weatherElement = document.querySelector('.weather');
            weatherElement.innerHTML = `<h3 class="temperature" data-temperatureFahrenheit="${temperature}">Temperature: ${temperature} °F</h3>`;

            // Update the city in the UI
            const cityElement = document.querySelector('.city-text');
            cityElement.innerHTML = `<h3>Location: ${city}</h3>`;
        } else {
            console.error('Error fetching weather data: Invalid API response');
        }
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}
}

function updateTabTitle() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');
    let ampm = 'AM';

    if (!is12HourFormat) {
        // Use 24-hour format
        const timeString24 = `${hours}:${minutes}`;
        document.title = timeString24; // Set the tab title to the current time in 24-hour format
    } else {
        if (hours > 12) {
            hours -= 12;
            ampm = 'PM';
        }

        if (hours === 0) {
            hours = 12;
        }

        const timeString12 = `${hours}:${minutes} ${ampm}`;
        document.title = timeString12; // Set the tab title to the current time in 12-hour format
    }
}

    // Call the function to update the tab title initially
    updateTabTitle();

    // Set an interval to update the tab title every second
    setInterval(updateTabTitle, 1000);
