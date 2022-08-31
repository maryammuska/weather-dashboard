var apiKey = "5a2758b5cd5baba02cd6be48373cbe6f";
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
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
    fetch(url)
    .then(function(res) {
        return res.json();
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
