$(document).ready(function() {
	// Provide your access token
	L.mapbox.accessToken = 'pk.eyJ1IjoiaGF3YWlpemVybyIsImEiOiJlMmRlM2YwM2VlZWExODE0MGJhNzY2OGZlYzNlMDY2NiJ9.bb6hiEKb0vpXFkNRB4y78w';
	// var geojson = gon.geojson;
	// Create a map in the div #map
	var map = L.mapbox.map('map', 'hawaiizero.ngj0npl4').setView([38.909671288923, -77.034084142948], 13);
	var featureLayer = L.mapbox.featureLayer()
    .loadURL('/db/Night_Club.geojson')
    .addTo(map);
});