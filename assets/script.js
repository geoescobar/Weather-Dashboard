// variables
var navBar = document.getElementById("nav");
var mainDash = document.getElementById("mainDashboard");
var fiveDayDash = document.getElementById("five-day-forecast");
var mainCity = document.getElementById("main-city");
var mainTemp = document.getElementById("main-temp");
var mainWind = document.getElementById("main-wind");
var mainHumid = document.getElementById("main-humidity");
var icon = document.getElementById("icon");
var historyDropdown = document.getElementById("dropdown-list");

// search bar input text
var searchBtn = document.getElementById("search-btn");

// Recording input text to send to loadCityTemp function
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var inputText = document.getElementById("input-text");
  var cityInfo = inputText.value.trim();
  loadCityTemp(cityInfo, true);
});

loadCityHistory();
// fetching data from API
function loadCityTemp(cityName, newSearch) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=imperial&appid=e277e6868f8299dd93f5f4cdf4022982";
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("city name: " + data.name);
      console.log("icon: " + data.weather[0].icon);
      console.log("main temp: " + data.main.temp);
      console.log("humidity: " + data.main.humidity);
      console.log("wind speed: " + data.wind.speed);
      mainCity.textContent = data.name;
      icon.setAttribute(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png"
      );
      mainTemp.textContent = "Temp:  " + data.main.temp + "\xB0 " + " F";
      mainWind.textContent = "Wind: " + data.wind.speed + " MPH";
      mainHumid.textContent = "Humidity: " + data.main.humidity + "%";
      fiveDay(data.coord.lat, data.coord.lon);

      // local storage for history dropdown
      if (newSearch) {
        var localStorageKey = `previousCities`;
        console.log(localStorage);
        if (localStorage.getItem(localStorageKey)) {
          var cities = JSON.parse(localStorage.getItem(localStorageKey));
          cities.push(data.name);
          localStorage.setItem(localStorageKey, JSON.stringify(cities));
        } else {
          localStorage.setItem(localStorageKey, JSON.stringify([data.name]));
        }
        loadCityHistory();
      }
    });
}

// history dropdown function
function loadCityHistory() {
  historyDropdown.innerHTML = "";
  var localStorageKey = `previousCities`;
  var cities = JSON.parse(localStorage.getItem(localStorageKey));
  if (cities) {
      for (const city of cities) {
        var previousCity = document.createElement("li");
        previousCity.classList.add("prev-cities");
        previousCity.textContent = city;
        previousCity.addEventListener("click", function () {
          loadCityTemp(city, false);
        });
        historyDropdown.append(previousCity);
      }
  }
}

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
      fiveDayDash.innerHTML = "";
      for (var i = 1; i < 6; i++) {
        // divElement for date
        var divElement = document.createElement("div");
        divElement.setAttribute("class", "col");
        var newDate = new Date(data.daily[i].dt * 1000);
        var month = newDate.getMonth() + 1;
        var date = document.createElement("h2");
        date.textContent =
          month + "/" + newDate.getDate() + "/" + newDate.getFullYear();
        date.classList.add("five-day-date");
        divElement.append(date);

        // div element for icon
        var iconElement = document.createElement("img");
        iconElement.setAttribute(
          "src",
          "https://openweathermap.org/img/wn/" +
            data.daily[i].weather[0].icon +
            ".png"
        );
        divElement.append(iconElement);

        // divElement for temp
        var fiveDayTemp = document.createElement("p");
        fiveDayTemp.textContent = textContent =
          "Temp: " + data.daily[i].temp.day + "\xB0 " + " F";
        fiveDayTemp.classList.add("five-day-temp");
        divElement.append(fiveDayTemp);

        // divElement for wind
        var wind = document.createElement("p");
        wind.textContent = "Wind: " + data.daily[i].wind_speed + " MPH";
        wind.classList.add("wind");
        divElement.append(wind);

        // divElement for humidity
        var humidity = document.createElement("p");
        humidity.textContent = "Humidity: " + data.daily[i].humidity + " %";
        humidity.classList.add("humidity");
        divElement.append(humidity);

        //appending it to the html div for the 5 day dash
        fiveDayDash.append(divElement);
      }
    });
}
