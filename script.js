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
            var card = document.createElement("div");
            card.setAttribute("class", "card");
            card.setAttribute("style", "width: 18rem");
            var iconImgCode = data.weather[0].icon;
            var iconImg = document.createElement("img");
            iconImg.setAttribute("class", "card-img-top");
            iconImg.setAttribute("src", "http://openweathermap.org/img/wn/"+ iconImgCode + "@2x.png";
            card.appendChild(iconImg);
            var cardBody = createElement("div");
            cardBody.setAttribute("class", "card-body");
            var headerEl = document.createElement("h5");
            headerEl.setAttribute("class", "card-title");
            var timeStamp = forecastData.current.dt;
            var date = new Date(timeStamp);
            headerEl.textContent = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
            cardBody.appendChild(headerEl);
            var paraEl = document.createElement("p");
            paraEl.textContent = forecastData[0].description;
            cardBody.appendChild(paraEl);
            var listContainer = document.createElement("ul");
            listContainer.setAttribute("class", "list-group list-group-flush");
            var currentTemp = forecastData.current.temp - 273;
            var currentTempEl = document.createElement("li");
            currentTempEl.textContent = currentTemp + "&deg;" + "F";
            var windSpeed = forecastData.current.wind_speed + "MPH";
            var windSpeedEl = document.createElement("li");
            var humidity = forecastData.current.humidity + "%";
            var humidityEl = document.createElement("li");
            var UvIndex = forecastData.current.uvi;
            var UvIndexEl = document.createElement("li");
            listContainer.appendChild(windSpeedEl);
            listContainer.appendChild(humidityEl);
            listContainer.appendChild(UvIndexEl);
            card.appendChild(listContainer);

            // let temp = data.main.temp;
            // let windSpeed = data.weather.wind.speed;
            // let humidity = data.main.humidity;
            // let icon = data.main.icon;
            //object keys needed: date, weather icon, temp, windspeed, humidity
        });
}


getWeatherApi();
