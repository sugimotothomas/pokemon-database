// For the Pokemon DATABASE
// Created by Thomas Sugimoto
// 7/25/2018

// app setup
var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var mysql = require('./db.js');
var app = express();

// view engine setup
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', '4266');

// misc
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


// Root Page
app.get('/', function(req, res, next) {
	var context = {};
	mysql.pool.query(
		'SELECT P.id, P.name, T1.type_name `type1`, T2.type_name `type2`, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 ORDER BY P.id', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		
		var list = [];
		for(var row in rows) {

			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var colspan = 1;
			var display = "";
			if(rows[row].type2 == "None") {
				colspan = 2;
				display = "display:none;";
			}
		
			var toPush = {	'id': s,
							'name': rows[row].name,
							'url': rows[row].name.toLowerCase(),
							'type1': rows[row].type1,
							'type2': rows[row].type2,
							'colspan': colspan,
							'display': display,
							'description': rows[row].description
						};
			list.push(toPush);
		}
		context.pokemon = list;
		res.render('home', context);
		
	});
});

// Directs the search term to individual pokemon page
app.post('/pokemon/process', function(req, res, next) {
    var keyword = req.body.searchText;
    res.redirect('/pokemon/' + keyword);
  });
  


app.get('/pokemon/:keyword', function(req, res, next) {
	var pokemon = req.params.keyword;
	
	var context = {};
	
	mysql.pool.query(
		'SELECT P.id, P.name, T1.type_name `type1`, T2.type_name `type2`, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 WHERE P.name = ? ORDER BY P.id', 
		[pokemon || keyword],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var colspan = 1;
			var display = "";
			if(rows[row].type2 == "None") {
				colspan = 2;
				display = "display:none;";
			}
			var toPush = {	'id': s,
							'name': rows[row].name,
							'url': rows[row].name.toLowerCase(),
							'type1': rows[row].type1,
							'type2': rows[row].type2,
							'colspan': colspan,
							'display': display,
							'description': rows[row].description
						};
			list.push(toPush);
		}
		context.pokemon = list;
	});
	mysql.pool.query(
		'SELECT P.id, P.name FROM Pokemon P WHERE P.name <> ?',
		[pokemon],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var toPush = {	'id': s,
							'name': rows[row].name
						};
			list.push(toPush);
		}
		context.pokemonList = list;
	});
	mysql.pool.query(
		'SELECT P.id, P.name, T1.type_name `type1`, T2.type_name `type2`, P.description FROM Pokemon P INNER JOIN Types T1 ON T1.type_id = P.type1 INNER JOIN Types T2 ON T2.type_id = P.type2 INNER JOIN EvolvesInto EI ON EI.evolvesFrom = P.id INNER JOIN Pokemon P2 ON P2.id = EI.evolvesInto WHERE P2.name = ? ORDER BY P.id', 
		[pokemon],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var colspan = 1;
			var display = "";
			if(rows[row].type2 == "None") {
				colspan = 2;
				display = "display:none;";
			}
			var toPush = {	'id': s,
							'name': rows[row].name,
							'url': rows[row].name.toLowerCase(),
							'type1': rows[row].type1,
							'type2': rows[row].type2,
							'colspan': colspan,
							'display': display,
							'description': rows[row].description
						};
			list.push(toPush);
		}
		context.evolvesFrom = list;
	});
	mysql.pool.query(
		'SELECT P.id, P.name, T1.type_name `type1`, T2.type_name `type2`, P.description FROM Pokemon P INNER JOIN Types T1 ON T1.type_id = P.type1 INNER JOIN Types T2 ON T2.type_id = P.type2 INNER JOIN EvolvesInto EI ON EI.evolvesInto = P.id INNER JOIN Pokemon P2 ON P2.id = EI.evolvesFrom WHERE P2.name = ? ORDER BY P.id', 
		[pokemon],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var colspan = 1;
			var display = "";
			if(rows[row].type2 == "None") {
				colspan = 2;
				display = "display:none;";
			}
			var toPush = {	'id': s,
							'name': rows[row].name,
							'url': rows[row].name.toLowerCase(),
							'type1': rows[row].type1,
							'type2': rows[row].type2,
							'colspan': colspan,
							'display': display,
							'description': rows[row].description
						};
			list.push(toPush);
		}
		context.evolvesInto = list;
	});
	mysql.pool.query(
		'SELECT M.move_id, M.move_name, M.move_category, T.type_name move_type, M.move_power, M.move_pp FROM Move M INNER JOIN CanLearn CL ON M.move_id = CL.move INNER JOIN Pokemon P ON P.id = CL.pokemon INNER JOIN Types T ON T.type_id = M.move_type WHERE P.name = ? ORDER BY M.move_id ASC', 
		[pokemon],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {		
			var toPush = {	'move_id': rows[row].move_id,
							'move_name': rows[row].move_name,
							'move_category': rows[row].move_category,
							'url': rows[row].move_category.toLowerCase(),
							'move_type': rows[row].move_type,
							'move_power': rows[row].move_power,
							'move_pp': rows[row].move_pp};
						
			list.push(toPush);
		}
		context.moves = list;
	});
	mysql.pool.query('SELECT L.location_id, L.location_name, L.location_description FROM Location L INNER JOIN IsFoundIn IFN ON IFN.location = L.location_id INNER JOIN Pokemon P ON P.id = IFN.pokemon WHERE P.name = ? ORDER BY L.location_name', 
		[pokemon],
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var toPush = {	'location_id': rows[row].location_id,
							'location_name': rows[row].location_name,
							'location_description': rows[row].location_description};
			list.push(toPush);
		}
		context.locations = list;
		res.render('search', context);
	});
});

app.get('/of_type/:type', function(req, res, next) {
	var type = req.params.type;
	var context = {};
	mysql.pool.query('SELECT P.id, P.name, T1.type_name type1, T2.type_name type2, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 WHERE T1.type_name = ? OR T2.type_name = ? ORDER BY P.id', 
		[type, type], // This is the id of the type
		function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var s = "000" + rows[row].id;
			s = s.substr(s.length-3);
			var colspan = 1;
			var display = "";
			if(rows[row].type2 == "None") {
				colspan = 2;
				display = "display:none;";
			}
			var toPush = {	'type': type,
							'id': s,
							'name': rows[row].name,
							'url': rows[row].name.toLowerCase(),
							'type1': rows[row].type1,
							'type2': rows[row].type2,
							'colspan': colspan,
							'display': display,
							'description': rows[row].description};
			list.push(toPush);
		}
		context.results = list;
		res.render('of_type', context);
		
	});
});


app.get('/types', function(req, res, next) {
	var context = {};
	mysql.pool.query('SELECT * FROM Types', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var toPush = {	'type_id': rows[row].type_id,
							'type_name': rows[row].type_name};
			list.push(toPush);
		}
		context.results = list;
		res.render('types', context);
		
	});
});


app.get('/move', function(req, res, next) {
	var context = {};
	mysql.pool.query('SELECT M.move_id, M.move_name, T.type_name move_type, M.move_category, M.move_power, M.move_pp FROM Move M INNER JOIN Types T ON T.type_id = M.move_type ORDER BY M.move_id', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		
		var list = [];
		for(var row in rows) {
			
			var toPush = {	'move_id': rows[row].move_id,
							'move_name': rows[row].move_name,
							'move_category': rows[row].move_category,
							'url': rows[row].move_category.toLowerCase(),
							'move_type': rows[row].move_type,
							'move_power': rows[row].move_power,
							'move_pp': rows[row].move_pp};
			list.push(toPush);
		}
		context.results = list;
		res.render('move', context);
		
	});
});

app.get('/location', function(req, res, next) {
	var context = {};
	mysql.pool.query('SELECT * FROM Location', function(err, rows, fields) {
		if(err) {
			next(err);
			return;
		}
		var list = [];
		for(var row in rows) {
			var toPush = {	'location_id': rows[row].location_id,
							'location_name': rows[row].location_name,
							'location_description': rows[row].location_description};
			list.push(toPush);
		}
		context.results = list;
		res.render('location', context);
		
	});
});


// The delete get handler
app.get('/delete', function(req, res, next) {
	if(req.query.table == "Pokemon") {
		// delete the element from the database
		mysql.pool.query("DELETE FROM `EvolvesInto` WHERE evolvesFrom = ? OR evolvesInto = ?", 
			[req.query.id, req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
		mysql.pool.query("DELETE FROM `CanLearn` WHERE pokemon = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
		mysql.pool.query("DELETE FROM `IsFoundIn` WHERE pokemon = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
		mysql.pool.query("DELETE FROM `Pokemon` WHERE id = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if( req.query.table == "Move") {
		mysql.pool.query("DELETE FROM `CanLearn` WHERE move = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
		mysql.pool.query("DELETE FROM `Move` WHERE move_id = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if(req.query.table == "Location") {
		mysql.pool.query("DELETE FROM `IsFoundIn` WHERE location = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
		mysql.pool.query("DELETE FROM `Location` WHERE location_id = ?", 
			[req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if(req.query.table == "IsFoundIn") {
		mysql.pool.query("DELETE FROM `IsFoundIn` WHERE pokemon = ? AND location = ?", 
			[req.query.source, req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if(req.query.table == "CanLearn") {
		mysql.pool.query("DELETE FROM `CanLearn` WHERE pokemon = ? AND move = ?", 
			[req.query.source, req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if(req.query.table == "EvolvesInto") {
		mysql.pool.query("DELETE FROM `EvolvesInto` WHERE evolvesFrom = ? AND evolvesInto = ?", 
			[req.query.source, req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
	else if(req.query.table == "EvolvesFrom") {
		mysql.pool.query("DELETE FROM `EvolvesInto` WHERE evolvesInto = ? AND evolvesFrom = ?", 
			[req.query.source, req.query.id], 
			function(err, result) {
				if(err){
					next(err);
					return;
				}
			}
		);
	}
});


// insert get handler
app.get('/insertPokemon',function(req,res,next){
	var context = {};
	// insert the values from the request into the database
	mysql.pool.query("INSERT INTO `Pokemon` VALUES (?, ?, ?, ?, ?)", 
		[req.query.id, 
		req.query.name, 
		req.query.type1,
		req.query.type2,
		req.query.description], 
		function(err, result){
			if(err){
				next(err);
				return;
			} 
		}
	);	
});
app.get('/insertMove',function(req,res,next){
	var context = {};
	// insert the values from the request into the database
	mysql.pool.query("INSERT INTO `Move` VALUES (?, ?, ?, ?, ?, ?)", 
		[req.query.move_id, 
		req.query.move_name, 
		req.query.move_category,
		req.query.move_type,
		req.query.move_power,
		req.query.move_pp], 
		function(err, result){
			if(err){
				next(err);
				return;
			} 
		}
	);	
});
app.get('/insertLocation',function(req,res,next){
	var context = {};
	// insert the values from the request into the database
	mysql.pool.query("INSERT INTO `Location` VALUES (?, ?, ?)", 
		[req.query.location_id, 
		req.query.location_name, 
		req.query.location_description], 
		function(err, result){
			if(err){
				next(err);
				return;
			} 
		}
	);	
});
app.get('/insertEvolveFrom',function(req,res,next){
	var context = {};
	// insert the values from the request into the database
	mysql.pool.query("INSERT INTO `EvolvesInto` VALUES (?, ?)", 
		[req.query.evolvesFrom,
		req.query.evolvesInto], 
		function(err, result){
			if(err){
				next(err);
				return;
			} 
		}
	);	
});
app.get('/insertEvolveInto',function(req,res,next){
	var context = {};
	// insert the values from the request into the database
	mysql.pool.query("INSERT INTO `EvolvesInto` VALUES (?, ?)", 
		[req.query.evolvesFrom,
		req.query.evolvesInto], 
		function(err, result){
			if(err){
				next(err);
				return;
			} 
		}
	);	
});


// the first update handler
app.get('/update',function(req, res, next){
    var context = {};
    // Select the row from the database with the request's id
    mysql.pool.query('SELECT P.id, P.name, P.type1, P.type2, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 WHERE id=?',
        [req.query.id], 
        function(err, rows, fields){
            if(err){
                next(err);
                return;
            }
            var list = [];

            // make a list of JSON objects (we only need the first one)
            // that is based on the row with the specifed id
            for(var row in rows){
                var toPush = {	'id': rows[row].id,
								'name': rows[row].name,
								'type1': rows[row].type1,
								'type2': rows[row].type2,
								'description': rows[row].description};

                list.push(toPush);
            }
        // send that object to the update.handlebars page
        context.results = list[0];
        res.render('update', context);
    });
});

// the handler for when the user is finished updating the entry
app.get('/updateBack', function(req, res, next){
    var context = {};

    // we want the user to be able to leave some values alone
    // so we set it up so that if the user changes the value,
    // we use it. Otherwise, we leave the value to its previous value
    mysql.pool.query("SELECT P.id, P.name, T1.type_name type1, T2.type_name type2, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 WHERE id=?", 
        [req.query.id], 
        function(err, result){
            if(err){
                next(err);
                return;
            }
            if(result.length == 1){
                // get the current values from the database
                var curVals = result[0];


                // make the query to the database so that we update the values in the database only if
                // the values were changed. Otherwise, leave them to their previous values
                mysql.pool.query('UPDATE `Pokemon` SET id=?, name=?, type1=?, type2=?, description=? WHERE id=?', 
                [req.query.id || curVals.id, 
                req.query.name || curVals.name, 
				req.query.type1 || curVals.type1,
				req.query.type2 || curVals.type2,
                req.query.description || curVals.description, 
                req.query.id],
                function(err, result){
                    if(err){
                        next(err);
                        return;
                    }

                    // select all of the values in the database and send them to be rendered
                    mysql.pool.query('SELECT P.id, P.name, T1.type_name `type1`, T2.type_name `type2`, P.description FROM Pokemon P	LEFT JOIN Types T1 ON T1.type_id = P.type1 LEFT JOIN Types T2 ON T2.type_id = P.type2 ORDER BY P.id', 
					function(err, rows, fields){
                        if(err){
                            next(err);
                            return;
                        }
                        var list = [];
                        for(var row in rows){
							var s = "000" + rows[row].id;
							s = s.substr(s.length-3);
							var colspan = 1;
							var display = "";
							if(rows[row].type2 == "None") {
								colspan = 2;
								display = "display:none;";
							}
							var toPush = {	'id': s,
								'name': rows[row].name,
								'url': rows[row].name.toLowerCase(),
								'type1': rows[row].type1,
								'type2': rows[row].type2,
								'colspan': colspan,
								'display': display,
								'description': rows[row].description
								};
                            list.push(toPush);
                        }

                        context.pokemon = list;
                        res.render('home', context);
                    });
                });
            }
    });
});









// catch 404
app.use(function(req, res) {
	res.status(404);
	res.render('404');
});


// app run
app.listen(app.get('port'), function(){
  console.log('Application started on localhost:' + app.get('port') + '...');
});



