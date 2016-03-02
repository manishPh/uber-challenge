var app = app || {};

app.Truck = Backbone.Model.extend({
	initialize: function() {},
	defaults: {
		status: '',
		permit: '',
		block: '',
		received: '',
		facilitytype: '',
		blocklot: '',
		locationdescription: '',
		cnn: '',
		priorpermit: '',
		schedule: '',
		address: '',
		applicant: '',
		lot: '',
		fooditems: '',
		objectid: '',
		dayshours: ''
	}
});
