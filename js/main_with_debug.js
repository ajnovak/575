function initialize(){
	cities();
	console.log('cities function runs');
};

function cities(){}
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
var table = document.createElement("table");
var headerRow = document.createElement("tr");
table.appendChild(headerRow);
headerRow insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>");

cityPop.forEach(function(cityObject){
	var rowHtml= "<tr><td>" + cityObject.city + "</td><td>" + cityObject.population + "</td></tr>";
	table.insertAdjacentHTML('beforeend', rowHtml);
});

document.querySelector('#mydiv').appendChild(table);
addColumns(cityPop);
addEvents();

};

function addColumns(cityPop){
    var rows = document.querySelectorAll("tr"); // define var for tr
    document.querySelectorAll("tr").forEach(function(row, i){

    	if (i == 0){

    		row.insertAdjacntHTML('beforeend', '<th>City Size</th>');
    	} else {

    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium';

    		} else {
    			citySize = 'Large';
    		};

			row.insertAdjacntHTML = '<td' + citySize + '</td>';

			var newRow = document.createElement("td");
				newRow.innerHTML citySize;
				row.appedChild (newRow);
    	};
    });
};

function addEvents(){

	document.querySelector("table").addEventListener("mouseover", function(){
		
		var color = "rgb(";

		for (var i=0; i<3; i++){

			var random = Math.round(Math.random() * 255);

			color += "random";

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};

		document.querySelector("table").color = color;
	});

	function clickme(){

		alert('Hey, you clicked me!');
	};

	document.querySelector("table").addEventListener("click", clickme)
};

document.addEventListener('DOMContentLoaded',initialize)