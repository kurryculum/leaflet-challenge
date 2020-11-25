// var myMap = L.map("map", {
//     center: [15.5994, -28.6731],
//     zoom: 3
//   });
//   var link = "static/data/all_week.geojson";

  
//   // Adding tile layer
//   L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//     attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//     tileSize: 512,
//     maxZoom: 18,
//     zoomOffset: -1,
//     id: "mapbox/streets-v11",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
// var k=  L.map('map').setView([40, -100], 4);
  // Use this link to get the geojson data.
var link = "static/data/all_week.geojson.json";

// Grabbing our GeoJSON data..

// L.geoJson(json, {
//   pointToLayer: function (features, mag) {
//   return new L.CircleMarker(json, {radius: 8, 
//                                       fillOpacity: 1, 
//                                       color: 'black', 
//                                       fillColor: getColor(features.properties.mag), 
//                                       weight: 1,});
//   });   
// }             
// for (var i = 0; i < countries.length; i++) {

//   // Conditionals for countries points
//   var color = "";
//   if (countries[i].points > 200) {
//     color = "yellow";
//   }
//   else if (countries[i].points > 100) {
//     color = "blue";
//   }
//   else if (countries[i].points > 90) {
//     color = "green";
//   }
//   else {
//     color = "red";
//   }

//   // Add circles to map
//   L.circle(countries[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: color,
//     // Adjust radius
//     radius: countries[i].points * 1500
//   }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// }

//simple map test





var d = d3.json(link, function(data) {

  function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.mag +
          "</h3><hr><p>" + feature.properties.place + "</p>");
          
      }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
      });

      // Sending our earthquakes layer to the createMap function
      createMap(earthquakes);
  }

  function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    });

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);

    L.geoJson(data, {

      // makes points into circle markers and styles them, scaling using JavaScript Math; magnitude value for each quake from parsed JSON
      pointToLayer: function (feature, layers) {
          return L.circleMarker(layers, {
              radius: Math.sqrt(Math.pow(10, feature.properties.mag)/50000),
              fillColor: '#fff',
              color: '#000',
              weight: 15,
              opacity: 0.2,
              fillOpacity: 0.5
          });
      }
      }).addTo(myMap);
      var getDepthColor = function(d) {
        return d > 100  ? '#7a0177' :
                d > 50  ? '#c51b8a' :
                d > 20  ? '#f768a1' :
                d > 5   ? '#fbb4b9' :
                          '#feebe2'
      }

  }





  console.log(data);
  // Creating a GeoJSON layer with the retrieved data
  createFeatures(data.feature);
  console.log(data.feature);
  console.log(data.feature.properties);
  // console.log(data.features.properties.mag);

});


    
    
    
    
    
    

