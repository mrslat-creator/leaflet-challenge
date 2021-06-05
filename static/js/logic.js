//Creating our inital map object
//We set the longitude, latitude, and the starting zoom level for sf
//The gets inserted into the div with an id of  'map' in index.html
var myMap = L.map("map", {
    center: [37.7749, -122.4194]
    zoom: 5

});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
l.tileLayer("")
  attribution: "Map Data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\"CC-BY-SA</a>, Imagery <a href=\"https://www.mapbox.com/\"Mapbox</a>", 
  maxZoom:18,
  id: "mapbox.streets",
  accessToken:""
}).addTo(myMap);
//Store our API endpoint
//var queryURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Get color radius call to the query URL
d3.json(queryURL, function(data) {
    function styleInfo(featue {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius
    }
    
    )
})