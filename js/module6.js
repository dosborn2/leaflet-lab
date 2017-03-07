




//consolidate the createprop function
//from example 1.3 module 6
function createPopup(properties, attribute, layer, radius){
    //add city to popup content string
    var popupContent = "<p><b>Country:</b> " + properties.Country + "</p>";

    //add formatted attribute to panel content string
    var year = attribute.split("_")[1];
    popupContent += "<p><b>Population in " + year + ":</b> " + properties[attribute] + " million</p>";

    //replace the layer popup
    layer.bindPopup(popupContent, {
        offset: new L.Point(0,-radius)
    });
};
pointToLayer: function (feature, latlng) {
  createPopup(feature.properties, attribute, layer, options.radius);
  //Step 5: For each feature, determine its value for the selected attribute
  var attValue = Number(feature.properties[attribute]);

  //examine the attribute value to check that it is correct
  //console.log(feature.properties, attValue);
  //Step 6: Give each feature's circle marker a radius based on its attribute value
  geojsonMarkerOptions.radius = calcPropRadius(attValue);

  //create circle markers
  return L.circleMarker(latlng, geojsonMarkerOptions);

  },


  //Step 10: Resize proportional symbols according to new attribute values
  function updatePropSymbols(mymap, attribute){
  		//leaflets method to access all the leaflet layers currently on the map
      mymap.eachLayer(function(layer){
  				//if statement tests both for the existence of a feature in the layer
  				//and the existence of the selected attribute in the layer's feature properties
          if (layer.feature && layer.feature.properties[attribute]){
              //update the layer style and popup

  						//access feature properties
  						var props = layer.feature.properties;

  						//update each feature's radius based on new attribute values
  						var radius = calcPropRadius(props[attribute]);
  						layer.setRadius(radius);

  						//add city to popup content string
  						var popupContent = "<p><b>Country:</b> " + props.Country + "</p>";


  						//add formatted attribute to panel content string
  						var year = attribute.split("_")[1];
  						popupContent += "<p><b>Population in " + year + ":</b> " + props[attribute] + " million</p>";

  						//replace the layer popup
  						layer.bindPopup(popupContent, {
  								offset: new L.Point(0,-radius)
  
  							});
  						};
      		});
  			};
