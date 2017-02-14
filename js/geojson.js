//By Dylan Osborn
/* Map of GeoJSON data from MegaCities.geojson */

//function to instantiate the Leaflet map
function createMap(){
    //create the map
    var mymap = L.map('mapid', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(mymap);

    //call getData function
    getData(mymap);
};

//function to retrieve the data and place it on the map
function getData(mymap){
    //load the data from the data in .geojson file
    $.ajax("data/MegaCities.geojson", {
      //type of file is json
        dataType: "json",

        }
    );

//load the data
$.ajax("data/MegaCities.geojson", {
    dataType: "json",
    success: function(response){
        //create marker options
        //with the styles of the markers
        var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };

        //create a Leaflet GeoJSON layer and add it to the map
        L.geoJson(response, {
            pointToLayer: function (feature, latlng){
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(mymap);
    }
});
};

//function to attach popups to each mapped feature
function onEachFeature(feature, layer) {
    //no property named popupContent; instead, create html string with all properties
    var popupContent = "";
    if (feature.properties) {
        //loop to add feature property names and values to html string
        for (var property in feature.properties){
            popupContent += "<p>" + property + ": " + feature.properties[property] + "</p>";
        }
        layer.bindPopup(popupContent);
    };
};

//function to retrieve the data and place it on the map
function getData(mymap){
    //load the data
    $.ajax("data/MegaCities.geojson", {
        dataType: "json",
        success: function(response){

            //create a Leaflet GeoJSON layer and add it to the map
            L.geoJson(response, {
                onEachFeature: onEachFeature
            }).addTo(mymap);
        }
    });
};

//this script makes it so only cityies greater than 20 million show up on the map
// $.ajax("data/MegaCities.geojson", {
//     dataType: "json",
//     success: function(response){
//
//         //create a Leaflet GeoJSON layer and add it to the map
//         L.geoJson(response, {
//             //use filter function to only show cities with 2015 populations greater than 20 million
//             filter: function(feature, layer) {
//                 return feature.properties.Pop_2015 > 20;
//             }
//         }).addTo(mymap);
//     }
// });
// };
//loads the map to html
$(document).ready(createMap);
