function initialize(){ //use main function
	cities(); //call cities function
};

function cities(){
//define variable that contains main array
var cityPop = [
	{ 
		city: 'Madison',
		population: 233209
	},
	{
		city: 'Milwaukee',
		population: 594833
	},
	{
		city: 'Green Bay',
		population: 104057
	},
	{
		city: 'Superior',
		population: 27244
	}
];

var table = document.createElement("table"); //table creation

var headerRow = document.createElement("tr"); //creating table header

table.appendChild(headerRow); //add header row

headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>"); //city and population categories in header

cityPop.forEach(function(cityObject){
	var rowHtml = "<tr><td>" + cityObject.city + "</td><td>" + cityObject.population + "</td></tr>";
	table.insertAdjacentHTML('beforeend', rowHtml);
});

document.querySelector('#mydiv').appendChild(table);

addColumns(cityPop); //calling the functions to create table
addEvents();
};

function addColumns(cityPop){ //function containing code to construct table columns
    
	var rows = document.querySelectorAll('tr');
    document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){

    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>'); //city size header element creation
    	} else {

    		var citySize; //variable creation for citySize array

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};
			
			
			row.insertAdjacntHTML = '<td' + citySize + '</td>';
	
			var newRow = document.createElement('td')
			newRow.innerHTML = citySize
			row.appendChild(newRow);
		};
    });
};

function addEvents(){ //function for event code supporting hover and click actions

	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};

		};

		document.querySelector("table").color = color;
	});

	function clickme(){

		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener("click", clickme)
};

window.onload = initialize(); //initialize the initializer