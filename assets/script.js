$(document).ready();
let datePicked; 
let dates 
let city = "";   
let state = "";   
let apikey = "QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA";
let queryURL = "https://app.ticketmaster.com/discovery/v2/";


$(function(){
$('#search-Field').on('click', function(){
    console.log('What')
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v1/events.json?apikey=QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA",
        method: "GET"
      }).then(function(result) {
          console.log(result);
          var response = result.embedded.events
          var eventDiv = $("<div class='event'>");

          // Storing the rating data
          var name = response.name;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Name: " + name);

          // Displaying the rating
          eventDiv.append(pOne);

          // Storing the release year
          var urlTicketmaster = response.url;

          var PThree = $("<p>").text("URL: " + urlTicketmaster);
          eventDiv.append(PThree);
          //Add urlTicketmaster variable to a P tag and append it to the eventDiv.

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Dates: " + response.dates);

          // Displaying the release year
          eventDiv.append(pTwo);

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          eventDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#events-view").prepend(eventDiv);
        });

  

});




$(function() {

    $("#get-Button").on("click", function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#search").offset().top
        }, 2000);
    }  
     )

}
)});

