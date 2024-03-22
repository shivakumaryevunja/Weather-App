const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const location_error = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

searchBtn.addEventListener('click',()=>{
    getWeather(inputBox.value);
});

async function getWeather(city){
    const apiKey = "e595db133c0edba5f4a65220588a97dc";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weather_data = await fetch(`${url}`).then(response => response.json()); 
    console.log(weather_data.cod);
    if(weather_data.cod === `404`){
        location_error.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }
    console.log(weather_data);

    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}`;
    desc.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind.innerHTML = `${weather_data.wind.speed}Km/hr`;

    console.log(weather_data.cod);
    if(weather_data.cod === `404`){
        location_error.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }
    location_error.style.display = "none";
    weatherBody.style.display = "flex";
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "./asset/cloud.png";
            break;
        case 'Clear':
            weather_img.src = "./asset/clear.png";
            break;
        case 'Rain':
            weather_img.src = "./asset/rain.png";
            break;
        case 'Mist':
            weather_img.src = "./asset/mist.png";
            break;
        case 'Snow':
            weather_img.src = "./asset/snow.png";
            break;
    }
}

