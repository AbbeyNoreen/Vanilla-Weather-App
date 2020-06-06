let now = new Date();
let hour = now.getHours();
let minute = now.getMinutes();
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
let currentDateTime = document.querySelector(".currentDateTime");
currentDateTime.innerHTML = `${day} | ${month} ${date} | ${hour}:${minute}`;

function search(event) {
  event.preventDefault();
  let newInput = document.querySelector("#city-form");
  let updateCity = document.querySelector("#city");
  let cityName = document.querySelector("#city-form").value;
  updateCity.innerHTML = `${newInput.value}`;

  function getNewTemp(response) {
    let temperatureNow = document.querySelector("#temp-value");
    let newTemp = Math.round(response.data.main.temp);
    temperatureNow.innerHTML = `${newTemp}`;

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(getNewTemp);
}
let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", search);

function displayCurrentWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-value").innerHTML = Math.round(
    response.data.main.temp
  );
}
function getPosition(position) {
  let apiKey = "ee003aab68bcab21af649210b2a07f93";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCurrentWeather);
}
function currentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let button = document.querySelector("#current-button");
button.addEventListener("click", currentPosition);
