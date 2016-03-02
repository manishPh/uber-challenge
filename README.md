# uber-challenge
Uber coding challenge to create a service that tells the users about food trucks around San Francisco


# Hosted Application
Live demo of this app at: https://example-manish.herokuapp.com/

**Note**: Loading the app for the first time could be slow because of the way Heroku manages its server side (memory) resources. The second time onwards is generally pretty quick because the app is now in server memory.

# Technical Track
**Front-end track**: Using the data API directly into app to fasten development process and to focus on front end aspects of the app to make it as polished as possible.

# Technologies Used:
1. jquery, underscore, and Backbone.js (Using this combo for the first time)
2. HTML5
3. CSS3
4. Google Maps API
5. DataSF: Food Trucks API for data

# How to use
On page load, you will see google map with truck markers displayed on locations given by the API layer.

On the left hand side, you will see list of filters to filter truck data accordingly.

This will help users to search specific type of cuisines/food items. Users can also select/deselect "popular items" to have more control on their searches.

Clicking on a particular truck, will open info-window giving detail information.

**Get Directions** : User can get directions by clicking on the address inside infowindow. This works beautifully on mobile if the Google Map App is installed which gives immediate navigation options.

When the app is launched, users will be prompted to share their location for the directions purposes.

The app is **mobile friendly** and **responsive**.

# Architecture and Design of the app
This app follows Backbone.js standard by creating
	1. model - foodtruck model
	2. collections - collection of truck models and fetch data from API
	3. (controller) views: Event handling and display using _.templates

# Assumptions
Users will use browsers that behave well with HTML5/CSS3 features to give them the rich experience. This app is tested well on browsers like Chrome, Firefox, and Safari.

# Scope for improvement
1. Having php-mongoDB backend to make this application reliable, faster and flexible. Currently this app's performance and availability is direct function of public APIs performance and availability.
2. Having your own backend server and DB server will help you directly manage data write, session management in better flexible way. You can update DB data by having cron jobs and make use of server memcache to deliver it faster.
3. Backend server can also do CSS preprocessing, JS,CS minification & combination to serve static assets in as fewer HTTP requests as possible, to deliver "first byte" to client asap.
