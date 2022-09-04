var apiKey = "5a2758b5cd5baba02cd6be48373cbe6f";


var inputval = document.querySelector('#city-input');
var btn = document.querySelector('#search-button');
var forecast = document.querySelector('#forecast');
var cityTime = document.querySelector("#cityNameDate");

var $cityDate = moment().format("llll");
$("#currentDate").text($cityDate);

$("#search-btn").on("click", function(e){
    e.preventDefault();
    var cityName = $("#city-input").val();
    $("#city-input").val("");
    console.log(cityName);
    currentWeather(cityName);
});

function currentWeather(cityName)
{
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
    fetch(url)
    .then(function(res) {
        return res.json();
    })
    .then(function(data){
        console.log(data);
       
        $("#cityNameDate").text(data.name);
        $("#temp").text("Temp: " + data.main.temp + " F");
        $("#humidity").text("Humidity: " + data.main.humidity + "%");
        $("#windSpeed").text("Windspeed: " + data.wind.speed + "mph");
        // $("#uv").text(data.main.humidity + "%");

        
        saveLastCity(data.name)

        var urlOnecall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey};`

        fetch(urlOnecall)
        .then(function(res){
            return res.json();
        })
        .then(function(oneCallData){
            console.log(oneCallData);
        }
        )
        //nested API call
        //data.coord.lon
        //data.coord.lat
        //another fetch from inside this scope
        // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&units=imperial&appid={API key}
    })


}

function saveLastCity(cityName) {
    //controls saving cities
    var listOfCities = []
    if(localStorage.getItem("history")) {
        listOfCities = JSON.parse(localStorage.getItem("history"))
    }

    listOfCities.push(cityName);
    localStorage.setItem("history", JSON.stringify(listOfCities))
    //renderCities
    renderCities()
}

renderCities()
function renderCities () {
    $("#cityList").html("");

    var listOfCities = []
    if(localStorage.getItem("history")) {
        listOfCities = JSON.parse(localStorage.getItem("history"))
    }
    //button render for loop, but they do nothing after I click right now
    for(i=0; i<listOfCities.length; i++) {
        var newBtn = $("<button>").attr("class","btn btn-info col-12 mb-2")
        newBtn.text(listOfCities[i])
        $("#cityList").append(newBtn)
    }
}

//     function displayWeather(data) {
//         console.log(data);
//         // cityTime(data.name);
//         // console.log(data.main.humidity);
//         console.log(data.weather[0].icon);
//     }