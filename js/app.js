var app = app || {};

(function() {
	
	var foodTruckApp,
		AppView;

	AppView = Backbone.View.extend({
		el: '#main',
		trucksList: new app.TruckList(),
		initialize: function() {
			// Initialize all views
			this.initViews();

			// fetch data into truckist collection
			this.trucksList.fetchData();
			this.setupEvents();
		},
		initViews: function() {
			this.filterView = new app.FilterView();
			this.mapView = new app.MapView();
			this.mapView.addUserLocationMarker();
		},
		setupEvents: function() {
			this.listenTo(this.trucksList, 'dataFetchSuccess', this.handleFetchSuccess);
			this.listenTo(this.collection, 'dataFetchFilure', this.handleFetchFail);
		},
		handleFetchSuccess: function() {
			// Collection has received data successfully and models are now ready to use.
			this.addMarkers();
			app.trucks = this.trucksList;
		},
		addMarkers: function() {
			var _this = this;

			this.trucksList.models.forEach(function(truck) {
				markerView = _this.mapView.addMarker(truck);
			});
		}
	});

	app.foodTruckApp = new AppView();

})();
