$(document).ready();

$(function() {
  $("#search-Field").on("click", function() {
    $("#events-view").empty();
    var keyword = $("#searchbar").val();
    var city = $("#citybar").val();
    var dates = $("#datebar").val();
    $.ajax({
      url:
        "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA&keyword=" +
        keyword + "&city=" + city + "&dates" + dates,
      method: "GET"
    }).then(function(result) {
      console.log(result);
      var pFour = $("<p>").text("No Result");
      if (result._embedded === undefined) {
        eventDiv.append(pFour);
        return;
      }
      result._embedded.events.slice(0, 4).forEach(event => {
          console.log(event);
        var eventDiv = $(
          "<div class='event l-box pure-u-1 pure-u-md-1-2 pure-u-lg-1-4'>"
        );
        var pOne = $("<p>").text("Name: " + event.name);
        eventDiv.append(pOne);
        var urlTicketmaster = event.url;
        var PThree = $("<p>").attr("link" + urlTicketmaster);
        eventDiv.append(PThree);
        var pTwo = $("<p>").text("Dates: " + event.dates.start.localDate);
        eventDiv.append(pTwo);
        var pFive = $("<p>").text("Location: " + event.venues);
        eventDiv.append(pFive);
        var image = $("<img>").attr("src", event.images[0].url);
        eventDiv.prepend(image);
        $("#events-view").prepend(eventDiv);
      });
    });
  });
  
  $(function() {
    $("#get-Button").on("click", function() {
      $([document.documentElement, document.body]).animate(
        {
          scrollTop: $("#search").offset().top
        },
        2000
      );
    });
  });
});
var map
function createMap () {
  var options = {
    center: { lat: 40.700610, lng: -73.997242, },
    zoom: 14
  };
  map = new google.maps.Map(document.getElementById('map'), options);
  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });
  
  var markers = [];
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    if (places.length === 0)
      return;
    markers.forEach(function (m) { m.setMap(null); });
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (p) {
      if (!p.geometry)
      return;
    
    markers.push(new google.maps.Marker({
      map: map,
      title: p.name,
      position: p.geometry.location
    }));
    if (p.geometry.viewport)
      bounds.union(p.geometry.viewport);
    else
      bounds.extend(p.geometry.location);
  });
  map.fitBounds(bounds);
 });
}
function createMarker(options, html) {
  var marker = new google.maps.Marker(options);
  if (html) {
    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(html);
      infoWindow.open(options.map, this);
    });
  }
  return marker;
}
