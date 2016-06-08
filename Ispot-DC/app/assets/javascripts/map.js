$(document).ready(function() {
	// Provide your access token
	L.mapbox.accessToken = 'pk.eyJ1IjoiaGF3YWlpemVybyIsImEiOiJlMmRlM2YwM2VlZWExODE0MGJhNzY2OGZlYzNlMDY2NiJ9.bb6hiEKb0vpXFkNRB4y78w';
	//var geojson = gon.geojson;
	// Create a map in the div #map
	var map = L.mapbox.map('map', 'mapbox.emerald').setView([38.909671288923, -77.034084142948], 13);
	var locations = L.mapbox.featureLayer().addTo(map);
    //var geojson = [locations.loadURL('Night_Club.geojson')];
  var listings = document.getElementById('listings');
  var foursquarePlaces = L.layerGroup().addTo(map);

	// Credit Foursquare for their wonderful data
	map.attributionControl
  .addAttribution('<a href="https://foursquare.com/">Places data from Foursquare</a>');

  // var CLIENT_ID = 'LPOOYCXSKAOSEK2BZASUA2UADOBTO0G02VOLYIU0IFMPP3VK';
  // var CLIENT_SECRET = 'RATTW3V4NQHYBDDZYBOWY55NZTX44BT0PMHCHJPZ2BYQNQ0K';

	// https://developer.foursquare.com/start/search
	// var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/search' +
 //  	'?client_id=CLIENT_ID' +
 //  	'&client_secret=CLIENT_SECRET' +
 //  	'&v=20130815' +
 //  	'&ll=LATLON' +
 //  	'&query=<%= params[:term] %>';
  	//'&callback=?';

  var searchTerm = '<%= params[:term] %>';
  var Yelp_API_Endpoint = 'https://api.yelp.com/v2/search?term=' + 
    'Japanese' + 
    '&location=Washington, DC' +
    '&cll=latitude,longitude';


  var YelpJson = $.getJSON(Yelp_API_Endpoint 
    .replace('latitude, longitude', map.getCenter().lat + 
    ',' + map.getCenter().lng), function(result, status) {
      if (status !== 'success') return alert('Request to Foursquare failed');
  	       
  // var foursquarejson = $.getJSON(API_ENDPOINT
  //   .replace('CLIENT_ID', CLIENT_ID)
  //   .replace('CLIENT_SECRET', CLIENT_SECRET)
  //   .replace('LATLON', map.getCenter().lat +
  //   ',' + map.getCenter().lng), function(result, status) {
  //     if (status !== 'success') return alert('Request to Foursquare failed');
        var geojson = [Yelp_API_Endpoint];
        locations.setGeoJSON(geojson);  

        function setActive(el) {
          var siblings = listings.getElementsByTagName('div');
          for (var i = 0; i < siblings.length; i++) {
            siblings[i].className = siblings[i].className
            .replace(/active/, '').replace(/\s\s*$/, '');
          }
          el.className += ' active';
        }
        
        // Transform each venue result into a marker on the map.
        for (var i = 0; i < result.response.venues.length; i++) {
        var venue = result.response.venues[i];
        var popup = '<h3>' + venue.name + '</h3><div>' + venue.address;
        var latlng = L.latLng(venue.location.lat, venue.location.lng);
        var marker = L.marker(latlng, {
          icon: L.mapbox.marker.icon({
            'marker-color': '#009999',
            'marker-symbol': 'bar',
            'marker-size': 'large'
          })
        })

      // .bindPopup('<strong><a href="https://foursquare.com/v/' + venue.id + '">' +
      // venue.name + '</a></strong>')
      // .addTo(foursquarePlaces);

    	// Place divs in sidebar for each item, with link to item in map
      var listing = listings.appendChild(document.createElement('div'));
      listing.className = 'item';

      var link = listing.appendChild(document.createElement('a'));
      link.href = '#';
      link.className = 'title';

      var details = listing.appendChild(document.createElement('div'));
      details.innerHTML = venue.name;
      if (venue.name) {
        details.innerHTML += ' &middot; ' + venue.location.address;
      }

      link.onclick = function() {
        setActive(listing);

		    // When a menu item is clicked, animate the map to center
		    // its associated locale and open its popup.
		    map.setView(venue.getLatLng(), 16);
        venue.openPopup();
        return false;
      };

  	  // Marker interaction
  	  map.on('click', function(e) {
      // 1. center the map on the selected marker.
        map.panTo(venue.getLatLng());

        // 2. Set active the markers associated listing.
        setActive(listing);
      });

  	  popup += '</div>';
  		// .bindPopup(popup);
    };

  });

});