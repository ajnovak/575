window.onload = setMap();

function setMap(){

    //map frame dimensions
    var width = 960,
        height = 460;

    //create new svg container for the map
    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3.geoAlbers()
        .center([0, 46.2])
        .rotate([-2, 0])
        .parallels([43, 62])
        .scale(50)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);
        
    //use Promise.all to parallelize asynchronous data loading
    var promises = [d3.csv("../data/EnvJust.csv"),
                    d3.json("../data/USA.topojson"),
                    d3.json("../data/wiCounties.topojson")
                   ];
    Promise.all(promises).then(callback);


}

    function callback(data) {
        var csvData = data[0],
            midwest = data[1],
            wi = data[2];

        var region = topojson.feature(midwest, midwest.objects.USA);
        wicounties= topojson.feature(wi, wi.objects.wiCounties).features;

    //add Europe countries to map
    var countries = map.append("path")
        .datum(region)
        .attr("class", "countries")
        .attr("d", path);

    //add France regions to map
    var regions = map.selectAll(".regions")
        .data(wicounties)
        .enter()
        .append("path")
        .attr("class", function(d){
            return "regions " + d.properties.adm1_code;
        })
        .attr("d", path);
};
