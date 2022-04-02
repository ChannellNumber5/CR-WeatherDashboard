var ApiKey = "190910d9af2f002bd85f0e8b3e897c63";
var city = "seattle";
var stateCode = "WA";
var country = "USA";

function getWeatherApi() {

    var fetchUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + stateCode + "," + country + "&appid=" + ApiKey;

    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data[0].lat);
            console.log(data[0].lon);
            var lat = data[0].lat;
            var lon = data[0].lon;

    
            //object keys needed: city, weather icon, date, temp, windspeed, humidity, UV-index with color corresponding block/button
            getForecastApi(lat,lon);
            // for(let i = 0; i < data.length; i++) {

            // }
        });
}

function getForecastApi(latInput, lonInput) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latInput + "&lon=" + lonInput + "&appid=" + ApiKey;

    fetch(forecastUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (forecastData) {
            console.log(forecastData);
            // let temp = data.main.temp;
            // let windSpeed = data.weather.wind.speed;
            // let humidity = data.main.humidity;
            // let icon = data.main.icon;
            //object keys needed: date, weather icon, temp, windspeed, humidity
        });
}


getWeatherApi();
