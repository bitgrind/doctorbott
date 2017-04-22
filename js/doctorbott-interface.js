var doctorbott = require('./../js/doctorbott.js').DocBott;


$(function() {
  console.log("doc rdy");
  $("#search").submit(function(){
    event.preventDefault();
    console.log("query");
    var newDocBot = new DocBott();
    newDocBot.getIllness(input);
  });


  var displayIllness = function(response) {
    console.log(response);
  }
});
