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
var icon = document.getElementById('icon');


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
        console.log('city name: ' + data.name);
        console.log('icon: ' + data.weather[0].icon);
        console.log('main temp: ' + data.main.temp);
        console.log('humidity: ' + data.main.humidity);
        console.log('wind speed: ' + data.wind.speed);
        mainCity.textContent = data.name;
        icon.textContent = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "04d.png";
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

  for (var i = 0; i < 5; i++) {

  };
