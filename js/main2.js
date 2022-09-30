//declare map var in global scope
var map;
var dataStats = {};
//function to instantiate the Leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [20, 0],
        zoom: 2
    });

    //add OSM base tilelayer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

function calcStats(data){
    //create empty array to store all data values
    var allValues = [];
    //loop through each 
    for(var city of data.features){
        //loop through each year
        for(var year = 1957; year <= 2015; year+=1){
              //rocket launches per yearr
              var value = city.properties[String(year)];
              //add value to array
              allValues.push(value);
        }
    }
}
//added at Example 2.3 line 20...function to attach popups to each mapped feature
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


function createPropSymbols(data){

    var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ffeb90",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function (feature, latlng){
            return L.circleMarker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
}
//function to retrieve the data and place it on the map
function getData(map){
    //load the data
    fetch("data/Rlaunches.geojson")
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            //call function to create proportional symbols
            createPropSymbols(data);
        })
    };

document.addEventListener('DOMContentLoaded',createMap)