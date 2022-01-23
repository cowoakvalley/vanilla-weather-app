function currentTime() {
  let now = new Date();
  let date = document.querySelector("#timestamp");

  let hours = now.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  date.innerHTML = `${day} ${hours}:${minutes}`;
}
currentTime();

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

function search(city) {
  let apiKey = "feb97c1a35671d6e977431bde6db4781";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

search("Copenhagen");

let form = document.querySelector("#search-bar");
form.addEventListener("submit", searchCity);

function showFahrenheit(event) {
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemp = temperatureElement * 1.8 + 32;
  console.log(fahrenheitTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
