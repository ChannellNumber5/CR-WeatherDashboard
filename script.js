var ApiKey = "726e01523fce1ab70de1e69a176fff19";
var city = "seattle";
var stateCode = "WA";
var country = "USA";

function getApi() {

var fetchUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "," + stateCode + "," + country + "&appid=" + ApiKey;

fetch(fetchUrl)
    .then(function (response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        for(let i = 0; i < data.length; i++) {

        }
    })
}