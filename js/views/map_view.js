var app = app || {};

app.MapView = Backbone.View.extend({
	markers: [],
	initialize: function() {
		if(!app.map) {
			this.initMap();
		}
	},
	initMap: function() {
		app.map = new google.maps.Map(document.getElementById('map'), {
			center: {lat: 37.760972, lng: -122.431297},
			zoom: 13
		});

		app.infoWindow = new google.maps.InfoWindow({});
	},
	addMarker: function(truck) {
		this.markers.push(new app.MarkerView(app.map, truck));
	},
	addUserLocationMarker: function() {
		var _this = this;

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				app.userLocation = [position.coords.latitude, position.coords.longitude];
				return new google.maps.Marker({
					position: {
						lat: app.userLocation[0],
						lng: app.userLocation[1]
					},
					map: app.map,
					title: 'Your Location'
				});
			});
		}
	},
	clearAllMarkers: function() {
		this.markers.forEach(function(marker) {
			marker.destroy();
		});
		this.markers.length = 0;
	}
});
