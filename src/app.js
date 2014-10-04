var UI = require('ui');
var ajax = require('ajax');

var vibe = require('ui/vibe');

console.log("app started");

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Weather',
  subtitle:'Fetching...'
});

// Display the Card
card.show();

// Construct URL
var cityName = 'Charlotte';
var URL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName;




function GetWeather(){
  console.log("GetWeather() called");
  card.title("Wolf Weather");
  card.subtitle("ReFetching...");
  card.body("         ");

  

  // Make the request
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log("Successfully fetched weather data!");
      vibe.vibrate('short');
      
      
      // Extract data
      var location = data.name;
      var temperature = Math.round(((data.main.temp - 273.15) * 1.8)+32) + "F";
      
      // Always upper-case first letter of description
      var description = data.weather[0].description;
      var humidity = data.main.humidity;
      var pressure = data.main.pressure;     
      
      
      
      description = description.charAt(0).toUpperCase() + description.substring(1);
      
      description = description + "\nhumidity: " + humidity;
      description = description + "\npressure: " + pressure;     
      
      
  
      // Show to user
      card.subtitle(location + ", " + temperature);
      card.body(description);

    },
    function(error) {
      // Failure!
      console.log('Failed fetching weather data: ' + error);
    }
  );
}


GetWeather();




card.on('click', 'up', function(e) {
  console.log("click up");
  GetWeather();
});



