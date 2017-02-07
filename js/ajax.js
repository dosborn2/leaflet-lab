//demo
function initialize(){
    //jsAjax();
    jQueryAjax();

};
/*
//demo of ajax using plain javascript
function jsAjax(){
  //instatiate an ajax request object
  //set up request object
  var ajaxRequest = new XMLHttpRequest();
  console.log(ajaxRequest);
  // create an event handler for the request -- handler that excutes when something changes-- assign handler function this f
  ajaxRequest.onreadystatechange = function(){
    console.log(ajaxRequest.readyState);
    // we want the data, how do we get the data -- this function executes when ready state becomes 4, if state is 4 the data has loaded and call back function called
    if (ajaxRequest.readyState == 4){
      console.log(ajaxRequest.response);
      // calll the callback function and pass the data to it
      jsCallback(ajaxRequest.response);
    };
  };

  // open ajax request
  ajaxRequest.open('GET', 'data/MegaCities.geojson', true);

  //st data type
  ajaxRequest.responseType = 'json';
  // send the call
  ajaxRequest.send();


};

function jsCallback(data){
  console.log(data);
  var htmlString = "<h3>JavaScript AJAX response text: </h3>";
  //turns object into a string
   htmlString += JSON.stringify(data);
  var p = document.createElement("p");
  p.innerHTML = htmlString;
  document.getElementById("mydiv").appendChild(p);
}
*/

//ajax using jquery
function jQueryAjax(){
  $.ajax("data/MegaCities.geojson", {
    dataType: "json",
    success: jQueryCallback
  });
// same as function jQueryAjax abovoe
//  $.getJSON("data/MegaCities.geojson", jQueryCallback);
};

function jQueryCallback(data){
  console.log(data);
  var htmlString = "<h3>jQuery AJAX response text</h3>";
  htmlString += JSON.stringify(data);
  $("#mydiv").append("<p>"+htmlString+"</p>");
};




window.onload = initialize;
