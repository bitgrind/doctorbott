//Epicodus's App

//Keys
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;


var resource_url = 'https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;

var resource_url = 'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;


//constrcutor
function DocBott() {
}

//Methods
DocBott.prototype.getIllness = function() {
  $.get('https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott)
    .then(function(response) {
      console.log("response"+response);
      displayIllness(response);
  });
}

DocBott.prototype.getDoctors = function() {
  $.get(resource_url)
    .then(function(response) {
      console.log("response"+response);
      displayDoctors(response);
  });
}

//Exports
exports.DocBott = DocBott;