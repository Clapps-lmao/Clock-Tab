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
        const temperatureInFahrenheit = element.getAttribute('data-temperatureFahrenheit');
        if (temperatureInFahrenheit !== null) {
            const temperatureInCelsius = Math.round((parseFloat(temperatureInFahrenheit) - 32) * (5 / 9));
            element.setAttribute('data-temperatureCelsius', temperatureInCelsius);
            element.textContent = `Temperature: ${temperatureInCelsius} °C`;
        }
    });
}

function convertAndDisplayTemperaturesToFahrenheit() {
    const temperatureElements = document.querySelectorAll('.temperature');

    temperatureElements.forEach((element) => {
        const temperatureInCelsius = element.getAttribute('data-temperatureCelsius');
        if (temperatureInCelsius !== null) {
            const temperatureInFahrenheit = Math.round((parseFloat(temperatureInCelsius) * 9 / 5) + 32);
            element.setAttribute('data-temperatureFahrenheit', temperatureInFahrenheit);
            element.textContent = `Temperature: ${temperatureInFahrenheit} °F`;
        }
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

    // Map of country codes to their abbreviations
    const countryAbbreviations = {
        'United States of America': '🇺🇸 USA',
        'Afghanistan': '🇦🇫 AF',
        'Albania': '🇦🇱 AL',
        'Algeria': '🇩🇿 DZ',
        'Andorra': '🇦🇩 AD',
        'Angola': '🇦🇴 AO',
        'Antigua and Barbuda': '🇦🇬 AG',
        'Argentina': '🇦🇷 AR',
        'Armenia': '🇦🇲 AM',
        'Australia': '🇦🇺 AU',
        'Austria': '🇦🇹 AT',
        'Azerbaijan': '🇦🇿 AZ',
        'Bahamas': '🇧🇸 BS',
        'Bahrain': '🇧🇭 BH',
        'Bangladesh': '🇧🇩 BD',
        'Barbados': '🇧🇧 BB',
        'Belarus': '🇧🇾 BY',
        'Belgium': '🇧🇪 BE',
        'Belize': '🇧🇿 BZ',
        'Benin': '🇧🇯 BJ',
        'Bhutan': '🇧🇹 BT',
        'Bolivia': '🇧🇴 BO',
        'Bosnia and Herzegovina': '🇧🇦 BA',
        'Botswana': '🇧🇼 BW',
        'Brazil': '🇧🇷 BR',
        'Brunei': '🇧🇳 BN',
        'Bulgaria': '🇧🇬 BG',
        'Burkina Faso': '🇧🇫 BF',
        'Burundi': '🇧🇮 BI',
        'Cabo Verde': '🇨🇻 CV',
        'Cambodia': '🇰🇭 KH',
        'Cameroon': '🇨🇲 CM',
        'Canada': '🇨🇦 CA',
        'Central African Republic': '🇨🇫 CF',
        'Chad': '🇹🇩 TD',
        'Chile': '🇨🇱 CL',
        'China': '🇨🇳 CN',
        'Colombia': '🇨🇴 CO',
        'Comoros': '🇰🇲 KM',
        'Congo': '🇨🇬 CG',
        'Costa Rica': '🇨🇷 CR',
        'Cote d\'Ivoire': '🇨🇮 CI',
        'Croatia': '🇭🇷 HR',
        'Cuba': '🇨🇺 CU',
        'Cyprus': '🇨🇾 CY',
        'Czechia': '🇨🇿 CZ',
        'Denmark': '🇩🇰 DK',
        'Djibouti': '🇩🇯 DJ',
        'Dominica': '🇩🇲 DM',
        'Dominican Republic': '🇩🇴 DO',
        'Ecuador': '🇪🇨 EC',
        'Egypt': '🇪🇬 EG',
        'El Salvador': '🇸🇻 SV',
        'Equatorial Guinea': '🇬🇶 GQ',
        'Eritrea': '🇪🇷 ER',
        'Estonia': '🇪🇪 EE',
        'Eswatini': '🇸🇿 SZ',
        'Ethiopia': '🇪🇹 ET',
        'Fiji': '🇫🇯 FJ',
        'Finland': '🇫🇮 FI',
        'France': '🇫🇷 FR',
        'Gabon': '🇬🇦 GA',
        'Gambia': '🇬🇲 GM',
        'Georgia': '🇬🇪 GE',
        'Germany': '🇩🇪 DE',
        'Ghana': '🇬🇭 GH',
        'Greece': '🇬🇷 GR',
        'Grenada': '🇬🇩 GD',
        'Guatemala': '🇬🇹 GT',
        'Guinea': '🇬🇳 GN',
        'Guinea-Bissau': '🇬🇼 GW',
        'Guyana': '🇬🇾 GY',
        'Haiti': '🇭🇹 HT',
        'Honduras': '🇭🇳 HN',
        'Hungary': '🇭🇺 HU',
        'Iceland': '🇮🇸 IS',
        'India': '🇮🇳 IN',
        'Indonesia': '🇮🇩 ID',
        'Iran': '🇮🇷 IR',
        'Iraq': '🇮🇶 IQ',
        'Ireland': '🇮🇪 IE',
        'Israel': '🇮🇱 IL',
        'Italy': '🇮🇹 IT',
        'Jamaica': '🇯🇲 JM',
        'Japan': '🇯🇵 JP',
        'Jordan': '🇯🇴 JO',
        'Kazakhstan': '🇰🇿 KZ',
        'Kenya': '🇰🇪 KE',
        'Kiribati': '🇰🇮 KI',
        'Korea (North)': '🇰🇵 KP',
        'Korea (South)': '🇰🇷 KR',
        'Kosovo': '🇽🇰 XK',
        'Kuwait': '🇰🇼 KW',
        'Kyrgyzstan': '🇰🇬 KG',
        'Laos': '🇱🇦 LA',
        'Latvia': '🇱🇻 LV',
        'Lebanon': '🇱🇧 LB',
        'Lesotho': '🇱🇸 LS',
        'Liberia': '🇱🇷 LR',
        'Libya': '🇱🇾 LY',
        'Liechtenstein': '🇱🇮 LI',
        'Lithuania': '🇱🇹 LT',
        'Luxembourg': '🇱🇺 LU',
        'Madagascar': '🇲🇬 MG',
        'Malawi': '🇲🇼 MW',
        'Malaysia': '🇲🇾 MY',
        'Maldives': '🇲🇻 MV',
        'Mali': '🇲🇱 ML',
        'Malta': '🇲🇹 MT',
        'Marshall Islands': '🇲🇭 MH',
        'Mauritania': '🇲🇷 MR',
        'Mauritius': '🇲🇺 MU',
        'Mexico': '🇲🇽 MX',
        'Micronesia': '🇫🇲 FM',
        'Moldova': '🇲🇩 MD',
        'Monaco': '🇲🇨 MC',
        'Mongolia': '🇲🇳 MN',
        'Montenegro': '🇲🇪 ME',
        'Morocco': '🇲🇦 MA',
        'Mozambique': '🇲🇿 MZ',
        'Myanmar': '🇲🇲 MM',
        'Namibia': '🇳🇦 NA',
        'Nauru': '🇳🇷 NR',
        'Nepal': '🇳🇵 NP',
        'Netherlands': '🇳🇱 NL',
        'New Zealand': '🇳🇿 NZ',
        'Nicaragua': '🇳🇮 NI',
        'Niger': '🇳🇪 NE',
        'Nigeria': '🇳🇬 NG',
        'North Macedonia': '🇲🇰 MK',
        'Norway': '🇳🇴 NO',
        'Oman': '🇴🇲 OM',
        'Pakistan': '🇵🇰 PK',
        'Palau': '🇵🇼 PW',
        'Palestine': '🇵🇸 PS',
        'Panama': '🇵🇦 PA',
        'Papua New Guinea': '🇵🇬 PG',
        'Paraguay': '🇵🇾 PY',
        'Peru': '🇵🇪 PE',
        'Philippines': '🇵🇭 PH',
        'Poland': '🇵🇱 PL',
        'Portugal': '🇵🇹 PT',
        'Qatar': '🇶🇦 QA',
        'Romania': '🇷🇴 RO',
        'Russia': '🇷🇺 RU',
        'Rwanda': '🇷🇼 RW',
        'Saint Kitts and Nevis': '🇰🇳 KN',
        'Saint Lucia': '🇱🇨 LC',
        'Saint Vincent and the Grenadines': '🇻🇨 VC',
        'Samoa': '🇼🇸 WS',
        'San Marino': '🇸🇲 SM',
        'Sao Tome and Principe': '🇸🇹 ST',
        'Saudi Arabia': '🇸🇦 SA',
        'Senegal': '🇸🇳 SN',
        'Serbia': '🇷🇸 RS',
        'Seychelles': '🇸🇨 SC',
        'Sierra Leone': '🇸🇱 SL',
        'Singapore': '🇸🇬 SG',
        'Slovakia': '🇸🇰 SK',
        'Slovenia': '🇸🇮 SI',
        'Solomon Islands': '🇸🇧 SB',
        'Somalia': '🇸🇴 SO',
        'South Africa': '🇿🇦 ZA',
        'South Sudan': '🇸🇸 SS',
        'Spain': '🇪🇸 ES',
        'Sri Lanka': '🇱🇰 LK',
        'Sudan': '🇸🇩 SD',
        'Suriname': '🇸🇷 SR',
        'Sweden': '🇸🇪 SE',
        'Switzerland': '🇨🇭 CH',
        'Syria': '🇸🇾 SY',
        'Taiwan': '🇹🇼 TW',
        'Tajikistan': '🇹🇯 TJ',
        'Tanzania': '🇹🇿 TZ',
        'Thailand': '🇹🇭 TH',
        'Timor-Leste': '🇹🇱 TL',
        'Togo': '🇹🇬 TG',
        'Tonga': '🇹🇴 TO',
        'Trinidad and Tobago': '🇹🇹 TT',
        'Tunisia': '🇹🇳 TN',
        'Turkey': '🇹🇷 TR',
        'Turkmenistan': '🇹🇲 TM',
        'Tuvalu': '🇹🇻 TV',
        'Uganda': '🇺🇬 UG',
        'Ukraine': '🇺🇦 UA',
        'United Arab Emirates': '🇦🇪 AE',
        'United Kingdom': '🇬🇧 GB',
        'Uruguay': '🇺🇾 UY',
        'Uzbekistan': '🇺🇿 UZ'
    }    

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.location && data.location.name && data.location.country) {
                const temperatureFahrenheit = Math.round(data.current.temp_f);
                const temperatureCelsius = Math.round(data.current.temp_c);

                // Get the abbreviated country name
                const abbreviatedCountry = countryAbbreviations[data.location.country] || data.location.country;

                // Store both Fahrenheit and Celsius temperatures in data attributes
                weatherElement.innerHTML = `<h3 class="temperature" data-temperatureFahrenheit="${temperatureFahrenheit}" data-temperatureCelsius="${temperatureCelsius}">Temperature: ${temperatureFahrenheit} °F</h3>`;
                cityElement.innerHTML = `<h3>Location: ${data.location.name}, ${data.location.region ? data.location.region + ', ' : ''}${abbreviatedCountry}</h3>`;
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

function openTimerModal() {
    const modal = document.getElementById('timer-modal');
    modal.style.display = 'block';
    }
    
    // Function to close the settings modal
    function closeTimerModal() {
    const modal = document.getElementById('timer-modal');
    modal.style.display = 'none';
    notificationAudio.pause();
    notificationAudio.currentTime = 0;
    }

// Function to open the settings modal
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


//circle start
let progressBar = document.querySelector('.e-c-progress');
let indicator = document.getElementById('e-indicator');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;
progressBar.style.strokeDasharray = length;
function update(value, timePercent) {
  var offset = - length - length * value / (timePercent);
  progressBar.style.strokeDashoffset = offset; 
  pointer.style.transform = `rotate(${360 * value / (timePercent)}deg)`; 
};
//circle ends
const displayOutput = document.querySelector('.display-remain-time')
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');
let intervalTimer;
let timeLeft;
let wholeTime = 0.5 * 60; // manage this to set the whole time 
let isPaused = false;
let isStarted = false;

update(wholeTime,wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);
function changeWholeTime(seconds){
  if ((wholeTime + seconds) > 0){
    wholeTime += seconds;
    update(wholeTime,wholeTime);
  }
}
for (var i = 0; i < setterBtns.length; i++) {
    setterBtns[i].addEventListener("click", function(event) {
        var param = this.dataset.setter;
        switch (param) {
            case 'minutes-plus':
                changeWholeTime(1 * 60);
                break;
            case 'minutes-minus':
                changeWholeTime(-1 * 60);
                break;
            case 'seconds-plus':
                changeWholeTime(1);
                break;
            case 'seconds-minus':
                changeWholeTime(-1);
                break;
        }
      displayTimeLeft(wholeTime);
    });
}
function timer (seconds){ //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function(){
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if(timeLeft < 0){
      clearInterval(intervalTimer);
      isStarted = false;
      setterBtns.forEach(function(btn){
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      return ;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
function pauseTimer(event){
  if(isStarted === false){
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
    
    setterBtns.forEach(function(btn){
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });
  }else if(isPaused){
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = isPaused ? false : true
  }else{
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = isPaused ? false : true ;
  }
}
function displayTimeLeft (timeLeft){ //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}
pauseBtn.addEventListener('click',pauseTimer);

const notificationAudio = document.getElementById('notificationAudio');

// ...

function timer(seconds) {
  let remainTime = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);

  intervalTimer = setInterval(function () {
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if (timeLeft < 0) {
      clearInterval(intervalTimer);
      isStarted = false;
      setterBtns.forEach(function (btn) {
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      // Play the notification audio when the timer reaches zero
      notificationAudio.play();
      return;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}
