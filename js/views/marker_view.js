app.MarkerView = Backbone.View.extend({
	initialize: function(map, model) {
		this.map = map;
		this.model = model;
		this.marker = this.getNewMarker();
		this.setupEvents();
	},
	template: _.template($('#infowindow-template').html()),
	getNewMarker: function() {
		var loc = this.model.get('location'),
			_this = this,
			image = {
				url: 'img/ft.png',
				size: new google.maps.Size(32, 16)
			};

		return new google.maps.Marker({
			position: {
				lat: parseFloat(loc.latitude, 10),
				lng: parseFloat(loc.longitude, 10)
			},
			map: _this.map,
			icon: image,
			title: _this.model.get('applicant')
		});
	},
	getInfoWindowContent: function() {
		var _this = this,
			contentString = '<div class="info-content">'+
			'<div class="trck-name">' + this.model.get('applicant') + '</div>'+
			'<div>' + this.model.get('address') + '</div>'+
			'<div>' + this.model.get('fooditems') + '</div>'+
			'</div>',
			latlng = this.marker.position.lat() + ',' + this.marker.position.lng();

			if(app.userLocation) {
				latlng += '/' + app.userLocation[0] + ',' + app.userLocation[1];	
			} else {
				latlng = '/' + latlng;
			}

		return this.template({
			truckname: this.model.get('applicant'),
			address: this.model.get('address'),
			blocklot: this.model.get('blocklot'),
			locationdescription: this.model.get('locationdescription'),
			schedule: this.model.get('schedule'),
			dayshours: this.model.get('dayshours'),
			fooditems: this.model.get('fooditems').split(': '),
			pos: latlng
		});
	},
	setupEvents: function() {
		var _this = this,
			gmapEvent = google.maps.event;

		this.evt = gmapEvent.addListener(_this.marker, 'click', function() {
			app.infoWindow.setContent(_this.getInfoWindowContent());
			app.infoWindow.open(_this.map, _this.marker);
		});
	},
	destroy:function() {
		// Also clear infowindow.
		this.evt.remove();
		this.marker.setMap(null);
	}	
});
