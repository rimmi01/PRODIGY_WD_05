document.getElementById('search-button').addEventListener('click', () => {
    const location = document.getElementById('location-input').value.trim();
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location');
    }
});

async function fetchWeatherData(location) {
    const apiKey = 'cb16bf8c1e74d3d68f8dd7ff70902315'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        console.log(data); // Log the entire response for debugging
        
        if (data.cod === 200) {
            displayWeatherData(data);
        } else {
            alert('Location not found');
        }
    } catch (error) {
        console.error('Error fetching the weather data', error);
        alert('Failed to fetch weather data');
    }
}

function displayWeatherData(data) {
    document.getElementById('location-name').textContent = data.name;
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;

    document.getElementById('weather-info').style.display = 'block';
}
