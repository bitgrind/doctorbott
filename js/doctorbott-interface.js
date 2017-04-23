var DocBott = require('./../js/doctorbott.js').DocBott;
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;



var displayIllness = function(response) {
  var illness = response.data;
  console.log("display illness");
  console.log(illness);
  illness.forEach(function(item){
    $("#health-output").append();
    console.log(item);
  });
}

$(function() {
  console.log("doc rdy");
  $("#getDoctors").click(function(){
    event.preventDefault();
    console.log("query");
    //var newDocBot = new DocBott();
    //newDocBot.getIllness();

    $.get('https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott)
      .then(function(response) {
        console.log("response"+response);
        displayIllness(response);
    });
  });
});
