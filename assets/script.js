$(document).ready();

$(function() {
    $("#search-Field").on("click", function() {
      $("#events-view").empty();
      var keyword = $("#searchbar").val();
      var city = $("#citybar").val();
      $.ajax({
        url:
          "https://app.ticketmaster.com/discovery/v2/events.json?apikey=QS5PYLoM9kjdMdl969ZTw7z5XJTZz0QA&keyword=" +
          keyword + "&city=" + city,
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
          var pFive = $("<p>").text("Location: " + event.postalCode);
          eventDiv.append(pFive);
          var image = $("<img>").attr("src", event.venues);
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

   function initAutocomplete() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13,
      mapTypeId: 'roadmap',
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
  
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  
    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
  
    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
  
      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];
  
      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };
  
        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        }));
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }