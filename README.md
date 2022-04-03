# The Weather Dashboard Application

For this project, the goal was to create a web app that could utilize the OpenWeather API to display the current weather in any city input by the user and then the 5 day forecast for that city. Once the city was searched, then the application would also be able to display the search results and "save" them over pageloads, so that the user could revisit their past searches.

This was a great project, but unfortunately, it could not be completed before it was due.

Check out the page [here](https://channellnumber5.github.io/CR-WeatherDashboard/) and here is the screenshot of the page, in it's glory. It will work well in loading and saving data, if an initial search is done and then the page is reloaded. Then the Search History section will populate.  Unfortunately, that fix could not be fixed and updated when I started to refactor the code to fix the issue of reloading the forecast cards as new searches are input. The code will be updated to fix these issues.

![Project Screenshot](/CR-WeatherDashboardScreenShot.png)

## Learning Lessons and Issues:
The trickiest part of this project had to do with three major concepts:
1. Working with the WebAPI to fetch and then display the correct information needed
1. Determining which variables could be declared locally vs. globally and how that affected what information was passed to and from functions
1. Determining how to create blank elements in the DOM, so that data can be passed into them and then how to traverse those blank elements (this gave me a host of errors and is why the project is not complete)

### Resources
- [Await and Fetch](https://dmitripavlutin.com/javascript-fetch-async-await/)

- [Converting Unix to Date](https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/)

- [How to get OpenWeather Icon](https://openweathermap.org/weather-conditions)

- [BootStrap Card Component](https://getbootstrap.com/docs/5.1/components/card/)

- [Bootstrap Horizontal Card Component](https://getbootstrap.com/docs/4.3/components/card/#horizontal)

- [UV Index Guide](https://www.epa.gov/sites/default/files/documents/uviguide.pdf)
Specifically, page 3.

- [Optional Chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

- [Removing Children from and Element in the DOM](https://attacomsian.com/blog/javascript-dom-remove-all-children-of-an-element)

- [Removing all Element Attributes](https://natclark.com/tutorials/javascript-remove-all-attributes/)