//Epicodus's App

//Keys
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;


var resource_url = 'https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;


//constrcutor
function DocBott() {
}

//Methods
DocBott.prototype.getLocation = function(zip, displayResults) {
    var geocoder = new google.maps.Geocoder();
    console.log("Location backend");
    geocoder.geocode({ 'address': zip }, function(results, status){
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      var coordinates = latitude+","+longitude;
      displayResults(coordinates, "location");
    });
}

DocBott.prototype.getIllness = function() {
  $.get('https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott)
    .then(function(response) {
      console.log("response"+response);
      displayIllness(response);
  });
}

DocBott.prototype.getDoctors = function(currentLocation, displayResults) {
  var urlRequest = 'https://api.betterdoctor.com/2016-03-01/doctors?location='+currentLocation+',10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;
  console.log("get doctors backend "+urlRequest);
  $.get(urlRequest)
    .then(function(response) {
      console.log("response"+response);
      displayResults(response, "doctors");
  });
}

//Exports
exports.DocBott = DocBott;