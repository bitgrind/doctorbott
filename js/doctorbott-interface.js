var DocBott = require('./../js/doctorbott.js').DocBott;
var apiKeyDoctorBott = require('./../.env').apiKeyDoctorBott;
var currentLocation = "45.542094,-122.9346037";


var displayResults = function(response, type) {
  console.log(response);
  if(type == "location") {
    currentLocation = response;
  }
  if(type == "doctors") {
    var result = response.data;
    result.forEach(function(item){
      $("#health-output").append();
      var doctorImg = item.profile.image_url;
      var doctorName = item.profile.title + " " +item.profile.first_name + " " + item.profile.last_name;
      var doctorBio = item.profile.bio;
      var doctorSpecialty = item.specialties[0].actor;
      var doctorLocation = item.practices[0].visit_address.city;
      var newDoctor = "<div class='doctor'><div class='docimg'><img src='"+doctorImg+"'></div><div class='title'><h1>"+doctorName+"</h1><h3>"+doctorSpecialty+" - "+doctorLocation+"</h3><span class='doctorBio'>"+doctorBio+"</span></div></div>";
      $("#doctors").append(newDoctor);
    });
  }
}

$(function() {
  console.log("doc rdy");

  $("#getLocation").on('change',function(){
    var docBott = new DocBott();
    console.log("state change");
    var zip = $("#getLocation").val();
    console.log(zip);
    docBott.getLocation(zip, displayResults);
  });

  $("#getDoctors").click(function(){
    $("#doctors").text("");
    event.preventDefault();
    console.log("find docs");
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
