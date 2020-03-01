// Creating map object
var map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

// Link to geoJSON data
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Grabbing our GeoJSON data..
d3.json(link, function(response){
    var features = response.features;
    // console.log(features[0]);

    // Loop through the cities array and create one marker for each city object
    for (var i = 0; i < features.length; i++) {

        // Conditionals for countries points
        var color = "";
        if (features[i].properties.mag > 4) {
        color = "orange";
        }
        else if (features[i].properties.mag > 3) {
            color = "yellow";
        }
        else if (features[i].properties.mag > 2) {
        color = "blue";
        }
        else if (features[i].properties.mag > 1) {
        color = "green";
        }
        else {
        color = "red";
        }

     // Add circles to map
     L.circle([features[i].geometry.coordinates[1],features[i].geometry.coordinates[0]],{
        fillOpacity: 0.50,
        weight: 1,
        color: "gray",
        fillColor: color,
        // Adjust radius
        radius: features[i].properties.mag * 50000
      }).bindPopup("<h1>" + features[i].properties.place + "</h1> <hr> <h3>magnitude: " + 
      features[i].properties.mag + "</h3>").addTo(map);
    
    };
    //Legend
    var legend = L.control({
        position: "bottomright"
      });
      
      legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'legend');
        magnitude = [1, 2, 3, 4, 5]
        colors = ["green", "blue", "yellow", "orange", "red"]
        for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitude[i] + (magnitude[i + 1] ? " &ndash; " + magnitude[i + 1] + "<br>" : " +");
        }
        return div;
      }
      legend.addTo(map);
 
});

