
// add an event listener to the insert button
if(document.getElementById('addPokemonSubmit')) {
document.getElementById('addPokemonSubmit').addEventListener('click',function(event){
	
	// get the form id
	var addPokemon = document.getElementById("newPokemon");

	// create a request so that we can add the element to the server
	var req = new XMLHttpRequest();

	// create and append the request parameters
	var qString = "/insertPokemon";
	var parameters = "name="+addPokemon.elements.name.value+
						"&id="+addPokemon.elements.id.value+
						"&type1="+addPokemon.elements.type1.value+
						"&type2="+addPokemon.elements.type2.value+
						"&description="+addPokemon.elements.description.value;
	console.log(parameters);

	// open the request
	req.open("GET", qString +"?"+parameters, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// set up an event listener for when the request returns
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			
		}
		else {
	    	console.log('there was an error');
		}
	});
	// send request
	req.send(qString +"?"+parameters);
	event.preventDefault();
});
}
if(document.getElementById('addLocationSubmit')) {
document.getElementById('addLocationSubmit').addEventListener('click',function(event){
	
	// get the form id
	var addLocation = document.getElementById("newLocation");

	// create a request so that we can add the element to the server
	var req = new XMLHttpRequest();

	// create and append the request parameters
	var qString = "/insertLocation";
	var parameters = "location_name="+addLocation.elements.location_name.value+
						"&location_id="+addLocation.elements.location_id.value+
						"&location_description="+addLocation.elements.location_description.value;
	console.log(parameters);

	// open the request
	req.open("GET", qString +"?"+parameters, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// set up an event listener for when the request returns
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			
		}
		else {
	    	console.log('there was an error');
		}
	});
	// send request
	req.send(qString +"?"+parameters);
	event.preventDefault();
});
}

if(document.getElementById('addEvolveFromSubmit')) {
document.getElementById('addEvolveFromSubmit').addEventListener('click',function(event){
	
	// get the form id
	var addEvolveFrom = document.getElementById("addEvolveFrom");
	var pokemon = parseInt(document.getElementById("pokemonName").title);
	// create a request so that we can add the element to the server
	var req = new XMLHttpRequest();

	// create and append the request parameters
	var qString = "/insertEvolveFrom";
	var parameters = "evolvesFrom="+parseInt(addEvolveFrom.value)+
						"&evolvesInto="+pokemon;
	
	console.log(parameters);

	// open the request
	req.open("GET", qString +"?"+parameters, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// set up an event listener for when the request returns
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			
		}
		else {
	    	console.log('there was an error');
		}
	});
	// send request
	req.send(qString +"?"+parameters);
	event.preventDefault();
});
}
if(document.getElementById('addEvolveToSubmit')) {
document.getElementById('addEvolveToSubmit').addEventListener('click',function(event){
	
	// get the form id
	var addEvolveTo = document.getElementById("addEvolveTo");
	var pokemon = parseInt(document.getElementById("pokemonName").title);
	// create a request so that we can add the element to the server
	var req = new XMLHttpRequest();

	// create and append the request parameters
	var qString = "/insertEvolveInto";
	var parameters = "evolvesInto="+parseInt(addEvolveTo.value)+
						"&evolvesFrom="+pokemon;
	
	console.log(parameters);

	// open the request
	req.open("GET", qString +"?"+parameters, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// set up an event listener for when the request returns
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			
		}
		else {
	    	console.log('there was an error');
		}
	});
	// send request
	req.send(qString +"?"+parameters);
	event.preventDefault();
});
}

if(document.getElementById('addMoveSubmit')) {
document.getElementById('addMoveSubmit').addEventListener('click',function(event){
	
	// get the form id
	var addMove = document.getElementById("newMove");

	// create a request so that we can add the element to the server
	var req = new XMLHttpRequest();

	// create and append the request parameters
	var qString = "/insertMove";
	var parameters = "move_name="+addMove.elements.move_name.value+
						"&move_id="+addMove.elements.move_id.value+
						"&move_type="+addMove.elements.move_type.value+
						"&move_category="+addMove.elements.move_category.value+
						"&move_power="+addMove.elements.move_power.value+
						"&move_pp="+addMove.elements.move_pp.value;
	console.log(parameters);

	// open the request
	req.open("GET", qString +"?"+parameters, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	// set up an event listener for when the request returns
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			
		}
		else {
	    	console.log('there was an error');
		}
	});
	// send request
	req.send(qString +"?"+parameters);
	event.preventDefault();
});
}


function deleteRow(tableId, id){
	// get the table and row count
	var table = document.getElementById(tableId);
	var pokemon = "";
	if(document.getElementById("pokemonName")) {
		pokemon = parseInt(document.getElementById("pokemonName").title);
	}
	var rowCount = table.rows.length;

	
	var IDnum = parseInt(id);
	//var s = "000" + id;
	//s = s.substr(s.length-3);
	// create a matching id for the hidden id
	var deleteString = "delete"+id;

	// loop through the rows (not including the header) to find the 
	// row with the delete cell that has a hidden input that contains
	// the id="delete{{this.id}}"
	for(var i = 1; i < rowCount; i++){
		var row = table.rows[i];
		var dataCells = row.getElementsByTagName("td");
		// console.log(dataCells);
		var deleteCell = dataCells[dataCells.length -1];
		// console.log(deleteCell);
		if(deleteCell.children[1].id === deleteString){
			// delete that row
			table.deleteRow(i);
			break;
		}

	}
	

	// setup and send a delete request to the server so it can delete the entry
	// from the database
	var req = new XMLHttpRequest();
	var qString = "/delete";
	var tableQuery = tableId.slice(0, -5);
	console.log('This is the pokemon = ' + pokemon);
	console.log('This is the table name:' + tableQuery);
	console.log('This is the value: ' + id);
	req.open("GET", qString+"?id="+IDnum + 
							"&table="+tableQuery + 
							"&source="+pokemon, true);
	req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	req.addEventListener("load",function(){
		if(req.status >= 200 && req.status < 400){
	    	console.log('delete request sent');
		} else {
		    console.log('there was an error in delete row');
			console.log('This is the id:' + id);
			
		}
	});

	req.send(qString+"?id="+IDnum + 
						"&table="+tableQuery + 
							"&source="+pokemon);

}