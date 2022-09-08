var apiKey = "5a2758b5cd5baba02cd6be48373cbe6f";

var inputval = document.querySelector("#city-input");
var btn = document.querySelector("#search-button");
var forecast = document.querySelector("#forecast");
var cityTime = document.querySelector("#cityNameDate");

// var $cityDate = moment().format("llll");
// $("#currentDate").text($cityDate);

$("#search-btn").on("click", function (e) {
  e.preventDefault();
  var cityName = $("#city-input").val();
  $("#city-input").val("");
  console.log(cityName);
  currentWeather(cityName);
});

function currentWeather(cityName) {
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);

      $("#cityNameDate").text(
        `${data.name} ${new Date(data.dt * 1000).toLocaleDateString("en-US")}` 
      );
      $("#temp").text("Temp: " + data.main.temp + " F");
      $("#humidity").text("Humidity: " + data.main.humidity + "%");
      $("#windSpeed").text("Windspeed: " + data.wind.speed + " mph");
      // $("#uv").text(data.main.humidity + "%");

      saveLastCity(data.name);

      var urlOnecall = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}&units=imperial`;

      fetch(urlOnecall)
        .then(function (res) {
          return res.json();
        })
        .then(function (oneCallData) {
          console.log(oneCallData);

          $("#index-highlight").text(`${oneCallData.current.uvi}`);

          if (oneCallData.current.uvi < 3) {
            $("#index-highlight").css("background-color","green");
          } else if (oneCallData.current.uvi > 5) {
            $("#index-highlight").css("background-color","red");
          } else {
            $("#index-highlight").css("background-color","yellow");
          };

         $("#5dayForecast").empty(); 

          for (let i = 0; i < 5; i++) {
            $("#5dayForecast")
              .append(`<div class="card col-2 text-white bg-dark font ">
        <div class="row">
        <div class="card-body">
          <p class="card-title">${new Date(
            oneCallData.daily[i].dt * 1000
          ).toLocaleDateString("en-US")}</p>
          <img src="https://openweathermap.org/img/w/${
            oneCallData.daily[i].weather[0].icon
          }.png">
          <p class="card-temp"> Temp: ${oneCallData.daily[i].temp.day} F</p>
          <p class="card-wind"> Windspeed: ${
            oneCallData.daily[i].wind_speed
          } mph</p>
          <p class="card-wind"> Humidity: ${oneCallData.daily[i].humidity}</p>
        </div>
        </div>
      </div>`);
          }
        });
    });
}

function saveLastCity(cityName) {
  //controls saving cities
  var listOfCities = [];
  if (localStorage.getItem("history")) {
    listOfCities = JSON.parse(localStorage.getItem("history"));
  }

  //renderCities

  if (!listOfCities.includes(cityName)) {
    listOfCities.push(cityName);
    localStorage.setItem("history", JSON.stringify(listOfCities));
  }
  renderCities();
}

renderCities();
function renderCities() {
  $("#cityList").html("");

  var listOfCities = [];
  if (localStorage.getItem("history")) {
    listOfCities = JSON.parse(localStorage.getItem("history"));
  }
  //button render for loop, but they do nothing after I click right now
  for (i = 0; i < listOfCities.length; i++) {
    var newBtn = $("<button>").attr({"class": "btn btn-info col-12 mb-2", onclick: `currentWeather('${listOfCities[i]}')`});
    newBtn.text(listOfCities[i]);
    $("#cityList").append(newBtn);
  }
}
