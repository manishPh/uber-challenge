app.TruckList = Backbone.Collection.extend({
    model: app.Truck,
    url: 'https://data.sfgov.org/resource/rqzj-sfat.json',
    parse: function(data) {
        // Return trucks whose location property is set
        return data.filter(function(tr) {
            return tr.location;
        });
    },
    fetchData: function() {
        var _this = this;

        _this.fetch({
            reset: true,
            success: function() {
              _this.trigger('dataFetchSuccess');
            },
            error: function() {
              _this.trigger('dataFetchFilure');
            }
        });
    }
});
