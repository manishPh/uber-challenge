var app = app || {};

app.FilterView = Backbone.View.extend({
	allFilters: [
		{name: 'american', text: 'American', selected: true},
		{name: 'indian', text: 'Indian', selected: true},
		{name: 'mexic', text: 'Mexican', selected: true},
		{name: 'pizza', text: 'Pizza', selected: true},
		{name: 'burgers', text: 'Burgers', selected: true},
		{name: 'taco', text: 'Tacos', selected: true},
		{name: 'hot dog', text: 'Hot Dogs', selected: true},
		{name: 'sandwich', text: 'Sandwich', selected: true}
	],
	searchString: '',
	el: '#filters',
	events: {
		'click #clearAllBtn': function(e) {
			this.clearSearch();
			this.clearAllMarkers();
			this.clearAllFilters();
		},
		'click #showAllBtn': 'showAll',
		'click #filter-list': 'handleCheckboxClick',
		'click #control': 'handleOpenClose',
		'keydown #foodsearch': 'handleSearch'
	},
	handleOpenClose: function() {
		var filterDiv = $(this.$el[0]),
			controlDiv = $(filterDiv.children()[1]);

		filterDiv.toggleClass('collapsed');
		setTimeout(function() {
			controlDiv.toggleClass('in');
		}, 1000);
	},
	handleSearch: function(e) {
		var search;
		if (e.keyCode === 13) {
			search = e.target.value;
			if (search) {
				this.searchString = search;
				this.clearAllFilters();
				this.clearAllMarkers();
				this.addMarkers(search);
			}
		}
	},
	initialize: function() {
		this.mapview = new app.MapView();
		this.render();
	},
	clearSearch: function() {
		this.searchString = '';
	},
	clearAllMarkers: function() {
		this.mapview.clearAllMarkers();
	},
	clearAllFilters: function() {
		this.allFilters.forEach(function(filter){
			filter.selected = false;
		});
		this.render();
	},
	showAll: function() {
		var _this = this;

		app.trucks.models.forEach(function(truck) {
			_this.mapview.addMarker(truck);
		});

		this.allFilters.forEach(function(filter){
			filter.selected = true;
		});
		this.clearSearch();
		this.render();
	},
	addMarkers: function(searchedItem) {
		var _this = this,
			searchedItem = searchedItem.toLowerCase();

		// Add new trucks to the map depending upon searches
		app.trucks.models.forEach(function(truck) {
			var fooditems = truck.get('fooditems').toLowerCase();

			if (fooditems.indexOf(searchedItem) !== -1) {
				_this.mapview.addMarker(truck);
			}
		});
	},
	handleCheckboxClick: function(e) {
		var target = e.target,
			filterType = target.getAttribute('data-filter-type'),
			filter = _.findWhere(this.allFilters, {name: filterType}),
			fooditems,
			_this = this;

		if(target.nodeName !== 'INPUT') {
			return;
		}

		this.clearAllMarkers();
		filter.selected = target.checked ? true : false;

		_this.allFilters.forEach(function(filter) {
			if(filter.selected) {
				_this.addMarkers(filter.name);
			}
		});
		this.clearSearch();
		this.render();
	},
	template: _.template($('#filters-template').html()),
	render: function() {
		this.$el.html(
			this.template({
				filters: this.allFilters,
				searchedItem: this.searchString
			})
		);
	}
});
