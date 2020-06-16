//Time and Date
function getDateTime(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let date = now.getDate();
  let weekDay = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
  let day = weekDay[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let currentDateTime = document.querySelector("#current-date-time");
  return `${day} | ${month} ${date} | ${formatHours(timestamp)}`;
}
//Forecast Time
function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hour = now.getHours();
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

//Search Button
function searchLocation(event) {
  event.preventDefault();
  let newInput = document.querySelector("#city-form");
  let updateCity = document.querySelector("#city");
  let cityName = document.querySelector("#city-form").value;
  updateCity.innerHTML = `${newInput.value}`;

  function getNewTemp(response) {
    let temperatureNow = document.querySelector("#temp-value");
    let newTemp = Math.round(response.data.main.temp);
    let descriptionNow = document.querySelector("#description");
    let humidityNow = document.querySelector("#humidity");
    let windNow = document.querySelector("#wind");
    let dateNow = document.querySelector("#current-date-time");
    let iconNow = document.querySelector("#current-icon");

    temperatureNow.innerHTML = `${newTemp}`;
    descriptionNow.innerHTML = response.data.weather[0].description;
    humidityNow.innerHTML = response.data.main.humidity;
    windNow.innerHTML = Math.round(response.data.wind.speed);
    dateNow.innerHTML = getDateTime(response.data.dt * 1000);
    iconNow.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconNow.setAttribute("alt", response.data.weather[0].description);

    //Toggle between F and C Temps
    function celTemp(event) {
      event.preventDefault();
      let celH3 = document.querySelector("#temp-value");
      let convertedTemp = Math.round(((`${newTemp}` - 32) * 5) / 9);
      celH3.innerHTML = convertedTemp;
    }
    let celsius = document.querySelector(".celUnit");
    celsius.addEventListener("click", celTemp);

    function farTemp(event) {
      event.preventDefault();
      let farH3 = document.querySelector("#temp-value");
      farH3.innerHTML = `${newTemp}`;
    }
    let far = document.querySelector(".farUnit");
    far.addEventListener("click", farTemp);
  }
  let apiKey = "ee003aab68bcab21af649210b2a07f93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getNewTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getForecast);
}

let searchbutton = document.querySelector("#search-form");
searchbutton.addEventListener("submit", searchLocation);

//Current Weather Button
function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );

  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let currentWind = document.querySelector("#wind");
  let currentDate = document.querySelector("#current-date-time");
  let currentIcon = document.querySelector("#current-icon");

  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentDate.innerHTML = getDateTime(response.data.dt * 1000);
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  currentIcon.setAttribute("alt", response.data.weather[0].description);
}

//Display Forecast at Bottom
function getForecast(response) {
  let forecastNow = document.querySelector("#forecast-one");
  forecastNow.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    forecastNow.innerHTML += `<div class="col">
            <div class="upcoming">
              <h4 class="weekDay"><strong>${formatHours(
                forecast.dt * 1000
              )}</strong></h4>
              <div class="upcomingIcon">
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" />
                <h4 class="tempCondition"> <span id="temp-value">${Math.round(
                  forecast.main.temp_max
                )} </span><a href="#" class="farUnit">°F</a><br /><br />
                <em>${forecast.weather[0].description}</em></h4>
              </div>
            </div>
            </div>`;
  }
}
//Current City Coordinates Button
function getPosition(position) {
  let apiKey = "ee003aab68bcab21af649210b2a07f93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayCurrentWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(getForecast);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentbutton = document.querySelector("#current-button");
currentbutton.addEventListener("click", currentPosition);
