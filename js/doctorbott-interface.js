var DocBott = require('./../js/doctorbott.js').DocBott;
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;
//Portland Default Location
currentLocation = "45.542094,-122.9346037";
currentCity = "Portland";


var displayResults = function(response, type) {
  console.log(response);
  if(type == "location") {
    currentLocation = response[0]+","+response[1];
    currentCity = response[2];
    console.log("currentLocation set: "+currentLocation);
    $("#getLocation span").text(currentCity);
  }
  if(type == "doctors") {
    var result = response.data;
    console.log("currentLocation set: "+currentLocation);
    result.forEach(function(item){
      $("#health-output").append();
      var doctorImg = item.profile.image_url;
      var doctorName = item.profile.title + " " +item.profile.first_name + " " + item.profile.last_name;
      var doctorBio = item.profile.bio;
      var doctorSpecialty = item.specialties[0].actor;
      // if(item.practices > 0){
        var doctorLocation = item.practices[0].visit_address.city;
      // }
      var doctorId = item.npi;
      var newDoctor = "<div class='doctor'><a class='doctorLink' href='"+doctorId+"'></a><div class='docimg'><img src='"+doctorImg+"'></div><div class='title'><span class'doctorName'>"+doctorName+"</span><span class='doctorSpecialty'>"+doctorSpecialty+" - "+doctorLocation+"</span><span class='doctorBio'>"+doctorBio+"</span></div></div>";
      $("#doctors").append(newDoctor);
    });
  }
}

$(function() {
  console.log("doc rdy");

  $("#getLocation").submit(function(){
    event.preventDefault();
    var docBott = new DocBott();
    console.log("state change");
    var zip = $("#getLocation .zip").val();
    console.log(zip);
    docBott.getLocation(zip, displayResults);
  });

  $("#getDoctors").click(function(){
    $("#doctors").text("");
    event.preventDefault();
    console.log("find docs");
    console.log("Doc for currentLocation: "+currentLocation);
    var docBott = new DocBott();
    docBott.getDoctors(currentLocation, displayResults);
  });

  $("#getPractices").click(function(){
    event.preventDefault();
    var urlRequest = 'https://api.betterdoctor.com/2016-03-01/practices?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;
    console.log("Get Specialties url: "+urlRequest);
    $.get(urlRequest)
      .then(function(response) {
        console.log("response"+response);
        displayResults(response);
    });
  });

  $("#getSpecialties").click(function(){
    event.preventDefault();

    var urlRequest = 'https://api.betterdoctor.com/2016-03-01/specialties?location=37.773,-122.413,10&skip=2&limit=10&user_key=' + apiKeyDoctorBott;
    console.log("Get Specialties url: "+urlRequest);
    $.get(urlRequest)
      .then(function(response) {
        console.log("response"+response);
        displayResults(response);
    });
  });
});
