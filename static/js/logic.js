//Creating our inital map object
//We set the longitude, latitude, and the starting zoom level for sf
//The gets inserted into the div with an id of  'map' in index.html
var myMap = L.map("map", {
    center: [37.7749, -122.4194]
    zoom: 5

});

// Adding a tile layer (the background map image)