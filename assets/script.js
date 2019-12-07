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
          var eventDiv = $("<div class='event'>");

          // Storing the rating data
          var name = response.embedded.events.name;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Name: " + name);

          // Displaying the rating
          eventDiv.append(pOne);

          // Storing the release year
          var urlTicketmaster = response.url;

          // Creating an element to hold the release year
          var pTwo = $("<p>").text("Dates: " + dates);

          // Displaying the release year
          eventDiv.append(pTwo);

          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          eventDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#events-view").prepend(eventsDiv);
        });

  

});

// $('.search-btn').on('click', function(){
//     $.ajax({
//         method:"GET",
//         url: "https://app.ticketmaster.com/discovery/v2/events/G5diZfkn0B-bh.json?apikey=QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA", 
        
//     });
//     console.log(dates)
//     function displayEventInfo() {

//         var events = $(this).attr("data-name");
//         var queryURL = "https://app.ticketmaster.com/discovery/v2/" + events + "QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA";

//         // Creating an AJAX call for the specific movie button being clicked
//         $.ajax({
//           url: queryURL,
//           method: "GET"
//         }).then(function(response) {
// })}});



$(function() {

    $("#get-Button").on("click", function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#search").offset().top
        }, 2000);
    }  
     )

}
)});

