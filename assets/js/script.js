var apiKey = "5a2758b5cd5baba02cd6be48373cbe6f";
// var cityName = "Los Angeles";
// var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
var cityTime = document.querySelector("#city-time");

$("#search-btn").on("click", function(e){
    e.preventDefault();
    var cityName = $("#city-input").val();
    $("#city-input").val("");
    console.log(cityName);
    currentWeather(cityName);
});

function currentWeather(cityName)
{
    // var coord_api = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetch(url)
    .then(function(res) {
        return res.json();
    // if(response.ok) {
       // return response.json().then(data => displayWeather(data));
       //console.log(res);
    // } else {
    //     alert("You need to type in a valid city")
    // }
    })
    .then(function(data){
        console.log(data);
        var city = $("<h2>");
        city.text(data.name);
        $("#current").append(city);
        
        var date = new Date(data.dt * 1000);
        var dateEl = $("<h2>");
        dateEl.text(date);
        $("#current").append(dateEl);

        var wind = $("<h4>");
        wind.text(wind);
        $("current").append(wind);
    })
}


//     function displayWeather(data) {
//         console.log(data);
//         // cityTime(data.name);
//         // console.log(data.main.humidity);
//         console.log(data.weather[0].icon);
//     }