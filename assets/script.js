// variables 
var navBar = document.getElementById('nav');
var mainDash = document.getElementById('mainDashboard');
var fiveDayDash = document.getElementById('five-day-forecast');
var dayOne = document.getElementById('dayOne');
var dayTwo = document.getElementById('dayTwo');
var dayThree = document.getElementById('dayThree');
var dayFour = document.getElementById('dayFour');
var dayFive = document.getElementById('dayFive');
var mainCity = document.getElementById('main-city');
var mainTemp = document.getElementById('main-temp');
var mainWind = document.getElementById('main-wind');
var mainHumid = document.getElementById('main-humidity');


// search bar input text
var inputText = document.getElementById('input-text');
var cityInfo = inputText.value.trim();
var searchBtn = document.getElementById('search-btn');

// fetching data from api for main dashboard
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=dallas&units=imperial&appid=e277e6868f8299dd93f5f4cdf4022982';
    fetch(apiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        mainCity.textContent = data.name;
        mainTemp.textContent = "Temp:  " + data.main.temp + "\xB0 " + " F";
        mainWind.textContent = "Wind: " + data.wind.speed + " MPH";
        mainHumid.textContent = "Humidity: " + data.main.humidity + "%";
    })

// fetching data for 5 day dashboard
function fiveDay(lat, lon) {
    // put the lat, lon, into the api URL
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=e277e6868f8299dd93f5f4cdf4022982`;
    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        console.log(data.dt_txt);
      });
  }


