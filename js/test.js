window.onload = setMap();

function setMap() {
    //use Promise.all to parallelize asynchronous data loading

    var promises = [
        d3.csv("data/EnvJust.csv"),
        d3.json("data/counties.topojson"),
        d3.json("data/region.topojson"),
    ];
    Promise.all(promises).then(callback);

    function callback(data) {
        var csvData = data[0],
            europe = data[1],
            france = data[2];

        var wicounties = topojson.feature(europe, europe.objects.counties),
        franceRegions = topojson.feature(france, france.objects.FranceRegions);

    //examine the results
    console.log(wicounties);
    console.log(franceRegions);
};
    }