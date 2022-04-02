var ApiKey = "190910d9af2f002bd85f0e8b3e897c63";
var city = "seattle";
var stateCode = "WA";
var country = "USA";
var currentWeatherDiv = document.querySelector(".currentWeather");

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
            var currentCard = document.createElement("div");
            currentCard.setAttribute("class", "card mb-3");
            // currentCard.setAttribute("style", "max-width: 540px;");
            var cardContent = document.createElement("div");
            cardContent.setAttribute("class", "row no-gutters");
            var iconImgCode = forecastData.current.weather[0].icon;
            var imgDiv = document.createElement("div");
            imgDiv.setAttribute("class", "col-md-4")
            var iconImg = document.createElement("img");
            iconImg.setAttribute("class", "card-img");
            iconImg.setAttribute("src", "http://openweathermap.org/img/wn/"+ iconImgCode + "@2x.png");
            imgDiv.appendChild(iconImg);
            cardContent.appendChild(imgDiv);
            var cardBodyDiv = document.createElement("div");
            cardBodyDiv.setAttribute("class", "col-md-8");
            var cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            var headerEl = document.createElement("h5");
            headerEl.setAttribute("class", "card-title");
            var timeStamp = forecastData.current.dt * 1000;
            var date = new Date(timeStamp);
            headerEl.textContent = city + " " + "("+ (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")";
            cardBody.appendChild(headerEl);
            var paraEl = document.createElement("p");
            paraEl.setAttribute("class", "card-text");
            paraEl.textContent = forecastData.alerts[0].description;
            cardBody.appendChild(paraEl);
            var currentTempEl = document.createElement("p");
            var cTSmallEl = document.createElement("small");
            cTSmallEl.setAttribute("class", "text-muted");
            currentTempEl.setAttribute("class", "card-text");
            currentTempEl.textContent = "Temp: " + Math.floor(((5/9) * (forecastData.current.temp - 273)) + 32) + " \xB0" + "F";
            currentTempEl.appendChild(cTSmallEl);
            var windSpeedEl = document.createElement("p");
            windSpeedEl.setAttribute("class", "card-text");
            var wSsmallEl = document.createElement("small");
            wSsmallEl.setAttribute("class", "text-muted");
            windSpeedEl.textContent = "Wind: " + forecastData.current.wind_speed + " MPH";
            windSpeedEl.appendChild(wSsmallEl);
            var humidityEl = document.createElement("p");
            humidityEl.setAttribute("class", "card-text");
            var hSmallEl = document.createElement("small");
            hSmallEl.setAttribute("class", "text-muted");
            humidityEl.textContent = "Humidity: " + forecastData.current.humidity + "%";
            humidityEl.appendChild(hSmallEl);
            var UvIndex = forecastData.current.uvi;
            var UvIndexEl = document.createElement("p");
            UvIndexEl.setAttribute("class", "card-text");
            if (UvIndex < 3 ){
                UvIndexEl.innerHTML = "UV Index: " + "<span class='UVI_low'>" + UvIndex + "</span>";
            } else if ( 3 <= UvIndex < 6) {
                UvIndexEl.innerHTML = "UV Index: " + "<span class='UVI_mod'>" + UvIndex + "</span>";
            } else if ( 6 <= UvIndex < 8) {
                UvIndexEl.innerHTML = "UV Index: " + "<span class='UVI_high'>" + UvIndex + "</span>";
            } else if ( 8 <= UvIndex < 11) {
                UvIndexEl.innerHTML = "UV Index: " + "<span class='UVI_veryHigh'>" + UvIndex + "</span>";
            } else {
                UvIndexEl.innerHTML = "UV Index: " + "<span class='UVI_extreme'>" + UvIndex + "</span>";
            }
            var UvSmallEl = document.createElement("small");
            UvSmallEl.setAttribute("class", "text-muted");
            UvIndexEl.appendChild(UvSmallEl);
            cardBody.appendChild(currentTempEl);
            cardBody.appendChild(windSpeedEl);
            cardBody.appendChild(humidityEl);
            cardBody.appendChild(UvIndexEl);
            cardBodyDiv.appendChild(cardBody);
            cardContent.appendChild(cardBodyDiv);
            currentCard.appendChild(cardContent);
            currentWeatherDiv.appendChild(currentCard);

            // let temp = data.main.temp;
            // let windSpeed = data.weather.wind.speed;
            // let humidity = data.main.humidity;
            // let icon = data.main.icon;
            //object keys needed: date, weather icon, temp, windspeed, humidity
        });
}


getWeatherApi();
