var map;
//declare minValue var in global scope
var dataStats = {};
//function to instantiate the leaflet map
function createMap(){
    //create the map
    map = L.map('map', {
        center: [38,-95],
        zoom: 4,
        //constrain zoom to United States
        maxZoom: 6,
        minZoom: 3,
        //constrain pan to United States
        maxBounds: [
          [53, -135],
          [23, -55]
          ]
    });

    //add own custom base tilelayer, designed for this project
     L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        tileSize: 512,
        zoomOffset: -1,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    //call getData function
    getData(map);
};

function calcStats(data){
    //create empty array to store all data values
    var allValues = [];
    //loop through each city
    for(var city of data.features){
        //loop through each year
        for(var year = 1957; year <= 2015; year+=1){
    
              var value = city.properties[String(year)];
              //add value to array
              allValues.push(value);
        }
    }
    //define for years with no launches
    dataStats.zero = 0;
    //define minimum value as 1, even though there are some locations with 0
    dataStats.min = 1;
    dataStats.max = 7;
    dataStats.three = 3;
}

//calculate the radius of each proportional symbol
function calcPropRadius(attValue) {
  //define radius for points with a value
    if (attValue >= 1){
    //constant factor adjusts symbol sizes evenly
    var minRadius = 5;
    //Flannery Apperance Compensation formula
    var radius = 1.0083 * Math.pow(attValue/dataStats.min,0.5715) * minRadius
    return radius;
    //define radius for points with no bars
  } else {
    var radius = 1;
    return radius;
  };
};

//create popup content
function PopupContent(properties, attribute){
  this.properties = properties;
  this.attribute = attribute;
  this.year = attribute.split("_")[1];
  this.bars = this.properties[attribute];
  this.formatted = "<p><b>City:</b> " + this.properties.city + "</p><p><b>Number of launches in " + this.year + ":</b> " + this.bars + "</p>";
}

//function to convert markers to circle markers and add popups
function pointToLayer(feature, latlng, attribute){
    //Determine which attribute to visualize with proportional symbols
    var attribute = attribute[0];
    //For each feature, determine its value for the selected attribute
    var attValue = Number(feature.properties[attribute]);

    //create marker options
    var options = {
        fillColor: "#D464A4",
        color: '#ffffff',
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.8
     };
    //Give each feature's circle marker a radius based on its attribute value
    options.radius = calcPropRadius(attValue);
    //create circle marker layer
    var layer = L.circleMarker(latlng, options);
    //build popup content string starting with city...Example 2.1 line 24
    var popupContent = new PopupContent(feature.properties, attribute);
    //bind the popup to the circle marker
    layer.bindPopup(popupContent.formatted, {
          offset: new L.Point(0,-options.radius)
      });
    //return the circle marker to the L.geoJson pointToLayer option
    return layer;
  };

//create proportional symbols
function createPropSymbols(data, attribute){
    //create a Leaflet GeoJSON layer and add it to the map
    L.geoJson(data, {
        pointToLayer: function(feature, latlng){
            return pointToLayer(feature, latlng, attribute);
        }
    }).addTo(map);
};

//Resize proportional symbols according to new attribute values
function updatePropSymbols(attribute){
  var year = attribute.split("_")[1];
    //update temporal legend
    $("span.year").html(year);
    map.eachLayer(function(layer){
        if (layer.feature && layer.feature.properties[attribute]){
          //access feature properties
           var props = layer.feature.properties;
           //update each feature's radius based on new attribute values
           var radius = calcPropRadius(props[attribute]);
           layer.setRadius(radius);
           //add city to popup content string
           var popupContent = new PopupContent(props, attribute);
           //update popup with new content
           popup = layer.getPopup();
           popup.setContent(popupContent.formatted).update();
        };
    });
};

function processData(data){
    //empty array to hold attribute
    var attribute = [];
    //properties of the first feature in the dataset
    var properties = data.features[0].properties;
    //push each attribute name into attribute array
    for (var attribute in properties){
        //only take attribute with population values
        if (attribute.indexOf("Bars") > -1){
            attribute.push(attribute);
        };
    };
    return attribute;
};

//Create new sequence controls
function createSequenceControls(attribute){
var SequenceControl = L.Control.extend({
        options: {
            position: 'bottomleft'
        },

        onAdd: function () {
            // create the control container div with a particular class name
            var container = L.DomUtil.create('div', 'sequence-control-container');

            //disable any mouse event listeners for the container
            L.DomEvent.disableClickPropagation(container);

            //create range input element (slider)
            $(container).append('<input class="range-slider" type="range">');

             //add skip buttons
            $(container).append('<button class="step" id="reverse" title="Reverse"><img src="../img/backward-01.png"></button>');
            $(container).append('<button class="step" id="forward" title="Forward"><img src="../img/forward-01.png"></button>');

            return container;

        }
    });

    map.addControl(new SequenceControl());

    //set slider attribute
    $('.range-slider').attr({
        max: 12,
        min: 0,
        value: 0,
        step: 1
    });
//click listener for buttons
    $('.step').click(function(){

      //get the old index value
      var index = $('.range-slider').val();

      //increment or decrement depending on button clicked
      if ($(this).attr('id') == 'forward'){
          index++;
          //if past the last attribute, wrap around to first attribute
          index = index > 12 ? 0 : index;
      } else if ($(this).attr('id') == 'reverse'){
          index--;
          //if past the first attribute, wrap around to last attribute
          index = index < 0 ? 12 : index;
      };

      //update slider
      $('.range-slider').val(index);
      //pass new attribute to update symbols
        updatePropSymbols(attribute[index]);
    });

    //input listener for slider
    $('.range-slider').on('input', function(){
      //get the new index value
      var index = $(this).val();
      //pass new attribute to update symbols
        updatePropSymbols(attribute[index]);
    });
  };

//create legend
function createLegend(attribute){
    var LegendControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function () {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'legend-control-container');

            $(container).append('<div class="temporal-legend">Number of Bars in <span class="year">2008</span></div>');

            //start attribute legend svg string
            var svg = '<svg id="attribute-legend" width="160px" height="53px">';

            //array of circle names to base loop on
            var circles = ["max", "three", "min", "zero"];

            //loop to add each circle and text to svg string
            for (var i=0; i<circles.length; i++){

              var radius = calcPropRadius(dataStats[circles[i]]);  
              var cy = 38 - radius;

                //circle string
                svg += '<circle class="legend-circle" id="' + circles[i] + '" r="' + radius + '"cy="' + cy + '" fill="#D464A4" fill-opacity="0.8" stroke="#ffffff" cx="30"/>';  

            //evenly space out labels            
            var textY = i * 12.5 + 12.5;

            //text string            
            svg += '<text id="' + circles[i] + '-text" x="60" y="' + textY + '">' + Math.round(dataStats[circles[i]]*100)/100 + " remaining" + '</text>';
        };

            //close svg string
            svg += "</svg>";

            //add attribute legend svg to container
            $(container).append(svg);

            return container;
        }
    });

    map.addControl(new LegendControl());

};

function getData(map){
    //load the data
    $.getJSON("data/Rlaunches.geojson", function(response){

            var attribute = processData(response);
            calcStats(response);
            //call function to create proportional symbols
            createPropSymbols(response,attribute);
            createSequenceControls(attribute);
            createLegend(attribute);
    });
};


document.addEventListener('DOMContentLoaded',createMap)