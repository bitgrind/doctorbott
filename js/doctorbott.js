//Epicodus's App

//Keys
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;


var resource_url = 'https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;


//constrcutor
function DocBott() {
}

//Methods
DocBott.prototype.getIllness = function(input) {
  $.get(resource_url)
    .then(function(response) {
      console.log(response);
      displayIllness(response);
  });

}

//Exports
exports.DocBott = DocBott;