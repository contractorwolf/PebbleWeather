var UI = require('ui');
var ajax = require('ajax');
var vibe = require('ui/vibe');
var Vector2 = require('vector2');

//35.0574564,-80.8910329
var lat = 35.0574564;
var long = -80.8910329;

var haveLocation = false;
var minutes = 3;
var intervalTime = 1000 * 60 * minutes;
var apiKey = "9c24271a7ee46cd8501b53804c9ecab5";


console.log("app started");

haveLocation = GetCoordinates();

// Create a Card with title and subtitle
var card = new UI.Card();
DrawWeather("Wolf Weather","Fetching...","");
card.show();

var wind = new UI.Window();
wind.backgroundColor('black');


//***************************
//*** FUNCTIONS *************
function GetCoordinates(){      
  console.log("GetCoordinates(): " + new Date().getTime());    
  navigator.geolocation.getCurrentPosition(
    function(pos){
      console.log("end timer: " + new Date().getTime());    
      var coords = pos.coords;
      lat  = coords.latitude ;
      long = coords.longitude;
      console.log("coordinate_pair:" + lat + "," +long);
      return(true);
    },
    function(error) {
      console.log("Failed to get coordinates:" + error.message + "\n\n");
        return(false);
    },
    {timeout:10000});
}

function GetWeather(){
  console.log("GetWeather(): " + new Date().getTime());  
  
  
  //card
  DrawWeather("Wolf Weather","ReFetching...","");
  
  

  
  haveLocation = GetCoordinates();
    

  var URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + "&&APPID=" + apiKey;   
  
  
  console.log("URL: " + URL);    

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
      DrawWeather("Wolf Weather",location + ", " + temperature,description);

    },
    function(error) {
      // Failure!
      console.log('Failed fetching weather data: ' + JSON.stringify(error));
    }
  );
  
  console.log("timeout set: " + new Date().getTime());  
  setTimeout(GetWeather, intervalTime);
  
  
}

function DrawWeather(title,subtitle,body){
  console.log("DrawWeather: " + new Date().getTime());  
  card.title(title);
  card.subtitle(subtitle);
  card.body(body);
}


//MAIN ACTIONS

GetWeather();


//BUTTON ACTIONS
card.on('click', 'up', function(e) {
  console.log("click up");
  GetWeather();
});

card.on('click', 'down', function(e) {
  card.hide();
  var textfield = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Wolf Weather',
    textAlign: 'center',
    color: 'white'
  });
  wind.add(textfield);
  
  wind.show();
});
wind.on('click', 'select', function(e) {
  console.log("click select");
    
  wind.hide();
  card.show();

});






