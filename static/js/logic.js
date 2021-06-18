//Creating our inital map object
//We set the longitude, latitude, and the starting zoom level for sf
//The gets inserted into the div with an id of  'map' in index.html
var myMap = L.map("map", {
    center: [37.7749, -122.4194],
    zoom: 5
    });

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map Data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>", 
  maxZoom:18,
  id: "mapbox.satellite",
  accessToken:"pk.eyJ1IjoibXJzbGF0LWNyZWF0b3IiLCJhIjoiY2tubHc4MHFhMGxkMTJvbTBnMGx2aWhmYSJ9.i0_Mpg0xLTXCVqk7x8jd2g"
}).addTo(myMap);

//Store our API endpoint
//var queryURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var queryURL ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// Get color radius call to the query URL
d3.json(queryURL, function(data) {
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
       };
    }
    // Set different color from magnitude
    function getColor(magnitude) {
    switch (true) {
    case magnitude > 5:
     return"#ea2c2c";
    case magnitude > 4:
      return"#ea822c";
    case magnitude > 3:
      return"#ee9c00";
    case magnitude > 2:
      return"#eecc00";
    case magnitude > 1:
      return"#d4ee00";
    default:
      return"#98ee00";
     }
    }
    //Set Radius from Magnitude
    function getRadius(magnitude) {
    if (magnitude === 0) {
       return 1;
    } 

    return magnitude * 4;
  }
    // GeoJSon layer
    L.geoJson(data, {
      //Maken circles
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
  //Circle Style
   style: styleInfo,
   // popup for each marker
   onEachFeature: function(feature, layer)  {
       layer.bindPopup("Magnitude:" + feature.properties.mag + "<br>Location: " + feature.properties.place);
       }
     }).addTo(myMap);
     
     //An Object Legend
    var legend = L.control({
     position: "bottomright"
    });

    // Details for the legend
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");

        var grades  = [0, 1, 2, 3, 4, 5];
        var colors = [
            "#98ee00",
            "#d4ee00",
            "#eecc00",
            "#ee9c00",
            "#ea822c",
            "#ea2c2c"
      ];
   
      // Looping through
      for (var i = 0; i < grades.length; i++) {
       div.innerHTML +=
        "<i style= 'background: " + colors[i] + "'></i> " +
        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i +1] + "</br>" : "+");
       }
       return div;
    };

    //Finally, we our legend to the map.
    legend.addTo(myMap);
  });