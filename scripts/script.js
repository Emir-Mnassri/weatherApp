const weatherForm = document.getElementById("displayWeatherInfo");
const cityInput = document.getElementById("cityName");
const button = document.getElementById("weatherButton");
const apikey = "42c1d4c62e372129f78f77b5b0a4b1d1";
const errorDisplay = document.getElementById("errorDisplay");
const cityNameDisplay = document.getElementById("city");
const tempDisplay = document.getElementById("temperature");
const humidityDisplay = document.getElementById("humidity");
const skyStateDisplay = document.getElementById("skyState");
const weatherEmojie = document.getElementById("emojie");


button.addEventListener('click', async event =>
        {
            event.preventDefault();

            const city = cityInput.value;

            if(city)
            {
                try
                {
                    const weatherData = await getWeatherData(city);
                    displayWeatherInfo(weatherData);                 

                }
                catch(error)
                {
                    displayError(error);
                }
            }
            else{
                displayError("Please Enter A City");
            }
    })

async function getWeatherData(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Could not fetch weather Data");
    }

    return await response.json();
}

function displayWeatherInfo(data)
{
    weatherForm.style.display="flex";

    errorDisplay.textContent='';

    const {
    name: city,
    main:{temp,humidity},
    weather: [{description,id}]
    } = data;

    cityNameDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    skyStateDisplay.textContent = description;
    weatherEmojie.textContent=getWeatherEmojie(id);

    changeBgColor(id);
}

function getWeatherEmojie(weatherId)
{
    switch(true)
    {
     case(weatherId>=200 && weatherId<300):
        return '⛈️';
     case(weatherId>=300 && weatherId<400):
        return '🌦️';
    case(weatherId>=500 && weatherId<600):
        return '🌧️';
    case(weatherId>=600 && weatherId < 700):
        return '❄️';
    case(weatherId>=700 && weatherId < 800):
        return '🌫️';
    case(weatherId===800):
        return '☀️';
    case(weatherId>=801 && weatherId < 810):
        return '☁️';
    default:
        return '❓';
    }
}

function changeBgColor(weatherId)
{
    switch(true)
    {
    case(weatherId>=200 && weatherId<300):
        weatherForm.style.background="linear-gradient(to bottom, #636fa4, #96a7cf)";
        break;
    case(weatherId>=300 && weatherId<400):
        weatherForm.style.background="linear-gradient(to bottom, #636fa4, #96a7cf)";
        break;
    case(weatherId>=500 && weatherId<600):
        weatherForm.style.background="linear-gradient(to bottom, #636fa4, #96a7cf)";
        break;
    case(weatherId>=600 && weatherId < 700):
        weatherForm.style.background="linear-gradient(to bottom, #b0bec5, #78909c)";
        weatherForm.style.color="#fafafa";
        break;
    case(weatherId>=700 && weatherId < 800):
        weatherForm.style.background="linear-gradient(to bottom, #d8dcdf, #b6b9bc)";
        weatherForm.style.color="#2b2d2f";
        break;
    case(weatherId===800):
        weatherForm.style.background="linear-gradient(to bottom, #a1c4fd, #c2e9fb)";
        break;
    case(weatherId>=801 && weatherId < 810):
        weatherForm.style.background="linear-gradient(to bottom, #b6b6b6, #e2e2e2)";
        break;
    }
}

function displayError(msg)
{
    cityNameDisplay.textContent='';
    tempDisplay.textContent='';
    humidityDisplay.textContent='';
    skyStateDisplay.textContent='';
    weatherEmojie.textContent='';
    errorDisplay.textContent=msg;
    weatherForm.style.display="flex";
}