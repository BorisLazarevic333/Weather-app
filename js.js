"use strict";

const apiKey = "6edaf37466dd5eccff08642b728079bd";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

// DOM

const search = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-input");
const mainEl = document.querySelector(".main");
const error = document.querySelector(".error");
const weatherIcon = document.querySelector(".weather-img");

// SEARCH FUNCTION

function performSearch() {
  checkWeather(searchInput.value);
  if (mainEl.classList.contains("active")) {
    mainEl.classList.remove("active");
  }
  search.classList.add("active");
  searchInput.value = "";
}

// ENTER KEY FIX

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") performSearch();
});

// API CONNECT

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    error.style.display = "block";
    mainEl.classList.remove("active");
  } else {
    let data = await response.json();

    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity-value").innerHTML =
      data.main.humidity + "%";
    document.querySelector(".wind-value").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clear") {
      weatherIcon.src = "svg/clear.svg";
    } else if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "svg/clouds.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "svg/drizzle.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "svg/mist.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "svg/rain.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "svg/snow.svg";
    }
    error.style.display = "none";
    mainEl.classList.add("active");
  }
}
