//__Author__DylanOsborn

// https: also suppported.
// esri map loaded to html
var Esri_NatGeoWorldMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
});
// https: also suppported.
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});
// sets esri and toner maps as two different layers for the overlay
var mymap = L.map('mapid', {
	center: [25, 0],
	zoom: 2,
	layers: [Esri_NatGeoWorldMap, Stamen_TonerLite]
});
//variable created for the star icon for capitals overlay
var capitalIcon = L.icon({
	iconUrl: 'img/star.PNG',
});

//var created for each capital "brute force,"
//each locatation is given and assigned teh icon for the capital, a star
var Kabul = L.marker([34.5553,69.2075 ], {
	icon: capitalIcon
}).bindPopup('Kabul'),
		Canberra = L.marker([-35.2809, 149.1300], {
			icon: capitalIcon
		}).bindPopup('Canberra'),
		Vienna = L.marker([48.2082, 16.3738], {
			icon: capitalIcon
		}).bindPopup('Vienna'),
		Bridgetown = L.marker([13.0969, -59.6145], {
			icon: capitalIcon
		}).bindPopup('Bridgetown'),
		Brasilia = L.marker([-15.7916, -47.8821], {
			icon: capitalIcon
		}).bindPopup('Brasilia'),
		Ottawa  = L.marker([45.4215, -75.6972], {
			icon: capitalIcon
		}).bindPopup('Ottawa'),
		Beijing = L.marker([39.9042, 116.4074], {
			icon: capitalIcon
		}).bindPopup('Beijing'),
		Bogota = L.marker([4.7110, -74.0721], {
			icon: capitalIcon
		}).bindPopup('Bogota'),
		Cairo = L.marker([30.0444, 31.2357], {
			icon: capitalIcon
		}).bindPopup('Cairo'),
		Berlin = L.marker([52.5200, 13.4050], {
			icon: capitalIcon
		}).bindPopup('Berlin'),
		Baghdad = L.marker([33.3128, 44.3615], {
			icon: capitalIcon
		}).bindPopup('Baghdad'),
		Rome = L.marker([41.9028, 12.4964], {
			icon: capitalIcon
		}).bindPopup('Rome'),
		Jerusalem = L.marker([31.7683, 35.2137], {
			icon: capitalIcon
		}).bindPopup('Jerusalem'),
		Tripoli = L.marker([32.8872, 13.1913], {
			icon: capitalIcon
		}).bindPopup('Tripoli'),
		Khartoum = L.marker([15.5007, 32.5599], {
			icon: capitalIcon
		}).bindPopup('Khartoum'),
		Bern = L.marker([46.9480, 7.4474], {
			icon: capitalIcon
		}).bindPopup('Bern'),
		London = L.marker([51.5074, -0.1278], {
			icon: capitalIcon
		}).bindPopup('London'),
		DistrictOfColumbia = L.marker([38.9072, -77.0369], {
			icon: capitalIcon
		}).bindPopup('District of Columbia');

//assign the var capitals to the layer group of all the capitals
var capitals = L.layerGroup([Kabul, Canberra, Vienna, Bridgetown, Brasilia, Ottawa, Beijing, Bogota, Cairo, Berlin, Baghdad, Rome, Jerusalem, Tripoli, Khartoum, Bern, London, DistrictOfColumbia],{

});

//call getData function
 getData(mymap);
//var for basemaps
var baseMaps = {
	"Esri_NatGeoWorldMap": Esri_NatGeoWorldMap,
	"Stamen_TonerLite": Stamen_TonerLite
};
//var for overlay of capitals
var overlayMaps = {
	"Capitals": capitals,
};
//layer control is created
//baselayer map objects is first argument passed, overlay map object is second argument passed
L.control.layers(baseMaps, overlayMaps).addTo(mymap);


//Step 4: Determine which attribute to visualize with proportional symbols
//calculates radius of each proportional symbol
function calcPropRadius(attValue) {
    //scale factor to adjust symbol size evenly
		// had to make my scale marker extremly small bcause my attribute value is very large
    var scaleFactor = .000005;
    //area based on attribute value and scale factor
    var area = attValue * scaleFactor;
    //radius calculated based on area
    var radius = Math.sqrt(area/Math.PI);
		// radius is returned
    return radius;
    };

//Step 3: Add circle markers for point features to the map
//function used to create proportion symbols with the data on mymap
function createPropSymbols(data, mymap, attributes){
		var attribute = attributes[0];
    //create marker options
    var geojsonMarkerOptions = {

        radius: 8,
        fillColor: "#b533ff",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8

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
        	onEachFeature: function(feature, layer){
					//original popupContent changed to panelContent...Example 2.2 line 1
				  var popupContent = "<p><b>Country:</b> " + feature.properties.Country + "</p>";

				  //add formatted attribute to panel content string
				  var year = attribute.split("_")[1];
				  popupContent += "<p><b>Population in " + year + ":</b> " + feature.properties[attribute] + " million</p>";
				  //bind the popup to the circle marker
				  layer.bindPopup(popupContent, {
				    	offset: new L.Point(0,-geojsonMarkerOptions.radius),
				    	//closeButton: false
					});
				}
			//adds geojson data layer to the map
    }).addTo(mymap);
};


//Step 1: Create new sequence controls
function createSequenceControls(mymap, attributes){

    //create range input element (slider)
    $('#panel').append('<input class="range-slider" type="range">');
		//set slider attributes
		$('.range-slider').attr({
				max: 6,
				min: 0,
				value: 0,
				step: 1
		});
		//below Example 3.4...add skip buttons
$('#panel').append('<button class="skip" id="reverse">Reverse</button>');
$('#panel').append('<button class="skip" id="forward">Skip</button>');
//Below Example 3.5...replace button content with images
$('#reverse').html('<img src="img/reverse.png">');
$('#forward').html('<img src="img/forward.png">');

 //Example 3.12 line 2...Step 5: click listener for buttons
 $('.skip').click(function(){
		 //get the old index value
		 var index = $('.range-slider').val();

		 //Step 6: increment or decrement depending on button clicked
		 if ($(this).attr('id') == 'forward'){
				 index++;
				 //Step 7: if past the last attribute, wrap around to first attribute
				 index = index > 6 ? 0 : index;
		 } else if ($(this).attr('id') == 'reverse'){
				 index--;
				 //Step 7: if past the first attribute, wrap around to last attribute
				 index = index < 0 ? 6 : index;
		 };

		 //Step 8: update slider
		 $('.range-slider').val(index);
		 updatePropSymbols(mymap, attributes[index]);
 });
};


//Above Example 3.8...Step 3: build an attributes array from the data
function processData(data){
    //empty array to hold attributes
    var attributes = [];

    //properties of the first feature in the dataset
    var properties = data.features[0].properties;

    //push each attribute name into attributes array
    for (var attribute in properties){
        //only take attributes with population values
        if (attribute.indexOf("Yr") > -1){
            attributes.push(attribute);
        };
    };

    //check result
    console.log(attributes);

    return attributes;
};
//Import GeoJSON data
//also attempeted to import the overlay data from the capitals.geojson but went back to "brute force"
function getData(mymap){
	$.ajax("data/futurePop.geojson", {
			dataType: "json",
			success: function(response){
				// $.ajax("data/capitals.geojson", {
				// 		dataType: "json",
				// 		success: function(response2){
								//create an attributes array
								var attributes = processData(response);
								//createPropSymbols function called with perameters
								createPropSymbols(response, mymap, attributes);
								//createSequenceControls funtion called with perameters
								createSequenceControls(mymap, attributes);
								//put the stuff below in its own function eventually, that you call from here
								// var capitals = L.geoJson(response2, {
								// 	pointToLayer: function(feature, layer){
										//this is where you create each marker and give it the icon
										// var capitalIcon = L.icon({
										// 	iconUrl: 'img/star.PNG',
										// });
										// var overlayMaps = {
										// 	"Capitals": capitals,
										// 	//"Icon": capitalIcon
										// };


										}
									});
								};

								//here is where you put the layer control
								//L.control.layers(baseMaps, overlayMaps).addTo(mymap);
// 						}
// 				});
// 			}
// 	});
// };
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
