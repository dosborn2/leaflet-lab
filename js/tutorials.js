//Leaflet tutorials by Dylan Osborn

/* Example from Leaflet Quick Start Guide*/

//var mymap = L.map('mapid').setView([51.505, -0.09], 13);


// sets location and zoom for start point when html loads, this is set to 2 so both locations can be see, both denver and london
var mymap = L.map('mapid').setView([39.75621, -104.99404], 2);

//add tile layer...replace project id and accessToken with your own
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
}).addTo(mymap);



//this is another way to add the map with id and access token, but i couldn't get it to work so its commented out
// /*
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.mapbox-streets-v7',
//     accessToken: 'pk.eyJ1IjoiZG9zYm9ybjIiLCJhIjoiY2l5djFiYnAwMDAwYzJ3bXNyZWQ5OGlqZCJ9.Zcg1gm-k036BtYBkmtrwOQ'
//
// }).addTo(mymap);
// */




//assigns variable for marker
//the script l.marker is leaflet termanology for intiating the marker with geographical locations (lat,long) and adds to map
var marker = L.marker([51.5, -0.09]).addTo(mymap);

//assigns variable for circle on map
//the script l.circle is leaflet terminology for intiating the circle with geographical locations (lat, long) and adds to map
//radius in meters is set
//color, fill color and opacity is set
//variable is added to map
var circle = L.circle([51.508, -0.11], {
    radius: 1000,
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap);

//assigns variable for polygon
//the script l.polygon terminology for intiating the polygon with gewographical locations (lat, long) and adds to map
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);

//binds popup to the morker created above that says hello world! i am a popup
//pop up is automatic
marker.bindPopup("<strong>Hello world!</strong><br />I am a popup.")//.openPopup();
//binds popup to the circle stateing i am a circle when clicked on
circle.bindPopup("I am a circle.");
//binds popup to polygon stateing i am a polygon when clicked on
polygon.bindPopup("I am a polygon.");

//for the popup, l.popup is leaflet terminology for initiating popup object with autopan to location set as false
//
var popup = L.popup({
  autopan:false
})
//lat and long set for popup
    .setLatLng([51.5, -0.09])
    //content or text in popup given
    .setContent("I am a standalone popup.")
    //popup opens on mymap
     .openOn(mymap);

//function allows for reaction to user interaction
function onMapClick(e) {
    popup
        //the location where click occured
        .setLatLng(e.latlng)
        //the location where the click occured and allows the popup to "popup" in a set space for where mouse is clicked
        .setContent("You clicked the map at " + e.latlng.toString())
        // .openOn(mymap);
}
//set the function to work on mymap
mymap.on('click', onMapClick);


//geojson tutorial begins here

//geojson feature with a set of properties
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
//adds the feature to the map
 L.geoJSON(geojsonFeature).addTo(mymap);

//empty geojson layer asign it to a variable so features can be added to it later
var myLayer = L.geoJSON().addTo(mymap);
myLayer.addData(geojsonFeature);

//var for lines created with coordinates (lat, long)
var myLines = [{
    "type": "LineString",
    "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
    "type": "LineString",
    "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];
// style for lines created
var myStyle = {
    "color": "#ff7800",
    "weight": 5,
    "opacity": 0.65
};
//layer for mylines and style is added to map
L.geoJSON(myLines, {
    style: myStyle
}).addTo(mymap);

//var for states is created
//properties and the gyometry of polygon is added with coordinates
//polygons for both republican red, and Democrat blue
//the function that styles individual features based on their properties
//the party property is selected and the syle of the polygons is done accordingly
var states = [{
    "type": "Feature",
    "properties": {"party": "Republican"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-104.05, 48.99],
            [-97.22,  48.98],
            [-96.58,  45.94],
            [-104.03, 45.94],
            [-104.05, 48.99]
        ]]
    }
}, {
    "type": "Feature",
    "properties": {"party": "Democrat"},
    "geometry": {
        "type": "Polygon",
        "coordinates": [[
            [-109.05, 41.00],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.00]
        ]]
    }
}];

//layer for states is added with the style feature function
L.geoJSON(states, {
    style: function(feature) {
        switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
        }
    }
}).addTo(mymap);

//here pointToLayer option is ussed to create a circleMarker
//the style of the circleMarker is sete with radius, color, weight, opacity and fills
var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// L.geoJSON(someGeojsonFeature, {
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng, geojsonMarkerOptions);
//     }
// }).addTo(mymap);


//onEachFeature option is a function that gets called on each feature vefore adding it to a geojson layer
//this optioin is a good ideat to use when attaching a popup to features when they are clicked
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}
//var for point at the baseball stadium in denver
// the geometry is set with coordinates (lat, long)
var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};
//adds the layer to mymap
L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(mymap);

//here the function is called for each feature in the geojson layer and gets passed the feature and the layer
//the values get utilised in the feature's prperties and returns visibility by returning true or false
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];
//the layer is added to the map
L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(mymap);
