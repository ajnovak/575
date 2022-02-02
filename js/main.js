
//initialize function called when the script loads
function initialize(){
    cities();
};

//function to create a table with cities and their populations
function cities(){
    //define an array of objects for cities and population
    //Example 2.3 line 8...create an empty array
    var cityPop = [];

    //create the first city object
    var madison = {};
    //add each property to the object
    madison.city = 'Madison';
    madison.population = 233209;

    //push the city object into the array
    cityPop.push(madison);

    //repeat...
    var milwaukee = {};
    milwaukee.city = 'Milwaukee';
    milwaukee.population = 594833;
    cityPop.push(milwaukee);

    var greenBay = {};
    greenBay.city = 'Green Bay';
    greenBay.population = 104057;
    cityPop.push(greenBay);

    var superior = {};
    superior.city = 'Superior';
    superior.population = 27244;
    cityPop.push(superior);

    //...



    //create the table element
    var table = document.createElement("table");

    //create a header row
    var headerRow = document.createElement("tr");

    //add the "City" column
    var cityHeader = document.createElement("th");
    cityHeader.innerHTML = "City";
    headerRow.appendChild(cityHeader);

    //add the "Population" column
    var popHeader = document.createElement("th");
    popHeader.innerHTML = "Population";
    headerRow.appendChild(popHeader);

    //add the row to the table
    table.appendChild(headerRow);

    //loop to add a new row for each city
    /* for (var i = 0; i < cities.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cities[i];
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = population[i];
        tr.appendChild(pop);

        table.appendChild(tr);
    };
    */
       //Example 2.3 line 41...loop to add a new row for each city
       for (var i = 0; i < cityPop.length; i++){
        var tr = document.createElement("tr");

        var city = document.createElement("td");
        city.innerHTML = cityPop[i].city; //NOTE DIFFERENT SYNTAX
        tr.appendChild(city);

        var pop = document.createElement("td");
        pop.innerHTML = cityPop[i].population; //NOTE DIFFERENT SYNTAX
        tr.appendChild(pop);

        table.appendChild(tr);
    };

    //add the table to the div in index.html
    var mydiv = document.getElementById("mydiv");
    mydiv.appendChild(table);
};

//call the initialize function when the window has loaded
window.onload = initialize();