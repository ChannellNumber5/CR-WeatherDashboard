var ApiKey = "190910d9af2f002bd85f0e8b3e897c63";
var city = "seattle";
var stateCode = "WA";
var country = "USA";

function getWeatherApi() {

    var fetchUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + stateCode + "," + country + "&appid=" + ApiKey;

    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.coord.lat);
            console.log(data.coord.lon);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getForecastApi(lat,lon);
            // for(let i = 0; i < data.length; i++) {

            // }
        });
}

function getForecastApi(latInput, lonInput) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat="+ latInput + "&lon=" + lonInput + "&appid=" + ApiKey;

    fetch(forecastUrl)
        .then(function(response) {
            return response.json;
        })
        .then(function (forecast) {
            console.log(forecast);
        });
}


getWeatherApi();
