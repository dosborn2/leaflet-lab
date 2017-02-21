//__Author__DylanOsborn
//var mymap = L.map('mapid').setView([51.505, -0.09], 13);
//view is set to show the world at 2 zoom
var mymap = L.map('mapid').setView([25, 0], 2);{


// //add tile layer...replace project id and accessToken with your own
// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
// }).addTo(mymap);

// https: also suppported.
// esri map loaded to html
var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(mymap);


//call getData function
getData(mymap);

};

//Step 4: Determine which attribute to visualize with proportional symbols
//proportion symbols set to Yr_2080 attribute
var attribute = "Yr_2080";
//Step 3: Add circle markers for point features to the map
//function used to create proportion symbols with the data on mymap
function createPropSymbols(data, mymap){

    //create marker options
    var geojsonMarkerOptions = {

        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8

    };
    //calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
    var scaleFactor = .000005;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);

    return radius;
    };
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
          //Step 5: For each feature, determine its value for the selected attribute
          var attValue = Number(feature.properties[attribute]);

          //examine the attribute value to check that it is correct
          //console.log(feature.properties, attValue);
          //Step 6: Give each feature's circle marker a radius based on its attribute value
          geojsonMarkerOptions.radius = calcPropRadius(attValue);
          //create circle markers
          return L.circleMarker(latlng, geojsonMarkerOptions);

        },
        //calls popup feature to map
        //onEachFeature: onEachFeature,
        geoJsonFeature: function (geoJsonFeature) {
        return {}
}
    }).addTo(mymap);
};

//Step 2: Import GeoJSON data
function getData(mymap){
    //load the data
    $.ajax("data/futurePop.geojson", {
        dataType: "json",
        success: function(response){
            //call function to create proportional symbols
            createPropSymbols(response, mymap);
        }
    });
// };
//function useful for attaching events and popups to features
//function onEachFeature(feature, layer) {
  //original popupContent changed to panelContent...Example 2.2 line 1
  //var panelContent = "<p><b>Country:</b> " + feature.properties.Country + "</p>";

  //add formatted attribute to panel content string
  //var year = attribute.split("_")[1];
  //panelContent += "<p><b>Population in " + year + ":</b> " + feature.properties[attribute] + " million</p>";

  //popup content is now just the city name
  //var popupContent = feature.properties.Country;

  //bind the popup to the circle marker
  // layer.bindPopup(popupContent, {
  //   offset: new L.Point(0,-layer.radius),
  //   closeButton: false
// });

//event listeners to open popup on hover and fill panel on click
  // layer.on({
  //     mouseover: function(){
  //         this.openPopup();
  //       },
  //       mouseout: function(){
  //         this.closePopup();
  //       },
  //       click: function(){
  //         $("#panelid").html(panelContent);
  //       }
  //     });
};
