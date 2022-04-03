const ApiKey = "190910d9af2f002bd85f0e8b3e897c63";
var cityName;


function init() {
    const searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", function(){
        let cityInput = document.querySelector("#cityInput");
        let city = cityInput.value.trim();
        getWeatherApi(city);
        cityInput.value = "";
    });
    loadSearchHistory(accessStoredData());
}

function getWeatherApi(city) {
    var fetchUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + ApiKey;

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
            let cityName = data[0].name;
            getForecastApi(lat, lon, cityName);
            savesearch(accessStoredData(),cityName);
        });
}

async function getForecastApi(latInput, lonInput, cityName) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+ latInput + "&lon=" + lonInput + "&appid=" + ApiKey;

    const response = await fetch(forecastUrl);
    const forecastData = await response.json();
    console.log(forecastData);
    var currentWeather = forecastData.current;
    var dailyWeatherForecast = forecastData.daily;
    console.log(currentWeather);
    console.log(dailyWeatherForecast);
    var currentCard = document.createElement("div");
    currentCard.setAttribute("class", "card mb-3");
    
    var cardContent = document.createElement("div");
    cardContent.setAttribute("class", "row no-gutters");
    var iconImgCode = forecastData.current.weather[0].icon;
    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "col-md-4")
    var iconImg = document.createElement("img");
    iconImg.setAttribute("class", "card-img");
    iconImg.setAttribute("src", "https://openweathermap.org/img/wn/"+ iconImgCode + "@2x.png");
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
    headerEl.textContent = cityName + " " + "("+ (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + ")";
    cardBody.appendChild(headerEl);
    var paraEl = document.createElement("p");
    paraEl.setAttribute("class", "card-text");
    if (forecastData?.alerts?.length > 0) {
    paraEl.textContent = forecastData.alerts[0].description;
    cardBody.appendChild(paraEl);
    }
    var currentTempEl = document.createElement("p");
    var cTSmallEl = document.createElement("small");
    cTSmallEl.setAttribute("class", "text-muted");
    currentTempEl.setAttribute("class", "card-text");
    currentTempEl.textContent = "Current Temp: " + Math.floor(((9/5) * (forecastData.current.temp - 273)) + 32) + " \xB0" + "F";
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
    if (UvIndex < 3 ) {
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
    const currentWeatherDiv = document.querySelector(".currentWeather");
    currentWeatherDiv.appendChild(currentCard);
    createForecastCards(dailyWeatherForecast);
}

function createForecastCards(data) {
    var forecastedWeatherEl = document.querySelector(".forecastedWeather");
    forecastedWeatherEl = "";
    var forecastHeader = document.createElement("h4");
    forecastHeader.textContent = "5 Day Weather Forecast:"
    forecastedWeatherEl.appendChild(forecastHeader);
    for (var i = 0; i < 5; i++) {
        var forecastCard = document.createElement("div");
        forecastCard.setAttribute("class", "card col");
        var forecastDateEl = document.createElement("h6");
        var forecastTime = data[i].dt * 1000;
        var forecastDate = new Date(forecastTime);
        forecastDateEl.textContent = "("+ (forecastDate.getMonth() + 1) + "/" + forecastDate.getDate() + "/" + forecastDate.getFullYear() + ")";
        forecastCard.appendChild(forecastDateEl);
        var forecastImg = document.createElement("img");
        forecastImg.setAttribute("class", "card-img-top");
        var imgCode = data[i].weather[0].icon;
        forecastImg.setAttribute("src", "https://openweathermap.org/img/wn/"+ imgCode + "@2x.png");
        forecastCard.appendChild(forecastImg);
        var forecastBody = document.createElement("div");
        forecastBody.setAttribute("class", "card-body");
        var minTempEl = document.createElement("p");
        minTempEl.setAttribute("class", "card-text");
        minTempEl.textContent = "Temp Low: " + Math.floor(((9/5) * (data[i].temp.min - 273)) + 32) + " \xB0" + "F";
        forecastBody.appendChild(minTempEl);
        var maxTempEl = document.createElement("p");
        maxTempEl.setAttribute("class", "card-text");
        maxTempEl.textContent = "Temp High: " + Math.floor(((9/5) * (data[i].temp.max - 273)) + 32) + " \xB0" + "F";
        forecastBody.appendChild(maxTempEl);
        var windEl = document.createElement("p");
        windEl.setAttribute("class", "card-text");
        windEl.textContent = "Wind: " + data[i].wind_speed + " MPH";
        forecastBody.appendChild(windEl);
        var hEl = document.createElement("p");
        hEl.setAttribute("class", "card-text");
        hEl.textContent = "Humidity: " + data[i].humidity + "%";
        forecastBody.appendChild(hEl);
        forecastCard.appendChild(forecastBody);
        forecastedWeatherEl.appendChild(forecastCard);
    }
}

function accessStoredData() {
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    if(!savedSearches) {
        return;
    }
    let searches = [];
    for(let i = 0; i < savedSearches.length; i++) {
        searches.push(savedSearches[i]);
    }
    return searches;
}

function savesearch(searchArray, cityName) {
    let searchHistoryEl = document.querySelector(".searchHistory");
    searchHistoryEl.appendChild(createButton(cityName));
    searchArray.push(cityName);
}

function loadSearchHistory(searchArray) {
    if (!searchArray) {
        return;
    }
    const searchHistoryEl = document.querySelector(".searchHistory");
    for (let i =0; i < searchArray.length; i++) {      
        let city = searchArray[i];      
        searchHistoryEl.appendChild(createButton(city));
    }
    const clearSearch = createButton("Clear Search");
    searchHistoryEl.appendChild(clearSearch);

    searchHistoryEl.addEventListener("click", function(event) {
        if (event.target.hasClass("button")) {
            let searchCity = event.target.id;
            getWeatherApi(searchCity);
        }
        return;
    })
}

function createButton(buttonName) {
    let newButton = document.createElement("button");
    newButton.setAttribute("class","btn btn-outline-secondary container-fluid");
    newButton.setAttribute("id", buttonName);
    newButton.setAttribute("type","button");
    newButton.textContent = buttonName;
    return newButton;
}



init();
