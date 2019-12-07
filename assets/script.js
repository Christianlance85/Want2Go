$(document).ready();

$(function(){
$('#search-Field').on('click', function(){
    console.log('What')
    $('#events-view').empty();
    var keyword = $('#searchbar').val();
    var city = $('#citybar').val();
    $.ajax({
        url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA&keyword=" + keyword +  "&city=" + city,
        method: "GET"
      }).then(function(result) {
          console.log(result);
          var pFour = $('<p>').text('No Result');
          if (result._embedded === undefined) {
              eventDiv.append(pFour);
              return;
          }
          result._embedded.events.slice(0,4).forEach(event => {
            var eventDiv = $("<div class='event l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>");
    
            var pOne = $("<p>").text("Name: " + event.name);

            eventDiv.append(pOne);

            var urlTicketmaster = event.url;

            var PThree = $("<p>").text("URL: " + urlTicketmaster);

            eventDiv.append(PThree);

            var pTwo = $("<p>").text("Dates: " + event.dates);

            eventDiv.append(pTwo);

            var image = $("<img>").attr("src", event.images[1]);

            eventDiv.append(image);

            $("#events-view").prepend(eventDiv);
          });
          
          
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