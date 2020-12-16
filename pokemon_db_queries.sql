-- For the Pokemon DATABASE
-- Created by Thomas Sugimoto
-- 7/25/2018
-- Various queries used for the project 



-- get all the Pokemon's ID, name, and description to populate the pokedex table
SELECT P.id `ID`, P.name `Name`, T1.type_name `Type 1`, T2.type_name `Type 2`, P.description `Description` 
	FROM Pokemon P
	LEFT JOIN Types T1 ON T1.type_id = P.type1
	LEFT JOIN Types T2 ON T2.type_id = P.type2
ORDER BY P.id

-- get all the Pokemon's ID, name, and description to populate the pokedex table
-- and get all the evolutions
SELECT P.id `ID`, P.name `Name`, T1.type_name `Type 1`, T2.type_name `Type 2`, P.description `Description`, P3.name `Evolves From`, P2.name `Evolves Into` 
	FROM Pokemon P
	LEFT JOIN Types T1 ON T1.type_id = P.type1
	LEFT JOIN Types T2 ON T2.type_id = P.type2
    LEFT JOIN EvolvesInto ET1 ON ET1.evolvesFrom = P.id
    LEFT JOIN Pokemon P2 ON ET1.evolvesInto = P2.id
    LEFT JOIN EvolvesInto ET2 ON ET2.evolvesInto = P.id
    LEFT JOIN Pokemon P3 ON ET2.evolvesFrom = P3.id
GROUP BY P.id
ORDER BY P.id

-- get all the Locations
SELECT * FROM Location

-- get all the Types
SELECT * FROM Types

-- get all the moves
SELECT * FROM Move

-- Text search query for Pokemon
SELECT * FROM Pokemon
	WHERE Pokemon.name = [nameInput]

-- get all the moves available for a given Pokemon
SELECT M.move_name `Name`, M.move_category `Category`, M.move_type `Type`, M.move_power `Power`,
		M.move_pp `PP` FROM Move M 
	INNER JOIN CanLearn CL ON M.move_id = CL.move
	INNER JOIN Pokemon P ON P.id = CL.pokemon
	AND P.name = [pokemon]
ORDER BY M.move_name ASC
	

	
-- get all the pokemon that can learn a given move
SELECT P.id ID, P.name Name, M.move_name Can_Learn FROM Pokemon P
	INNER JOIN CanLearn CL ON CL.pokemon = P.id
	INNER JOIN Move M ON M.move_id = CL.move
	AND M.move_name = [move name]
ORDER BY P.id ASC

-- get all the evolutions of a given Pokemon
SELECT P1.name Evolves_From, P2.name Evolves_Into FROM EvolvesInto EI
	INNER JOIN Pokemon P1 ON EI.evolvesFrom = P1.id
	INNER JOIN Pokemon P2 ON EI.evolvesInto = P2.id
	AND P1.name = [pokemon_name]


-- get all pokemon found in a given location
SELECT P.id `ID`, P.name Name, L.location_name Location FROM Pokemon P 
	INNER JOIN IsFoundIn IFI ON IFI.pokemon = P.id
	INNER JOIN Location L ON L.location_id = IFI.location
	AND L.location_name = [location_name]
	
-- add a pokemon
INSERT INTO Pokemon (id, name, type1, type2, description) 
	VALUE ([idInput], [nameInput], [type1Input], [type2input], [descriptionInput])

-- add a Location
INSERT INTO Location (location_id, location_name, location_description)
	VALUE ([idInput],[nameInput],[descriptionInput])

-- add a Type
INSERT INTO Types (type_id, type_name) 
	VALUE ([idInput], [nameInput])
	
-- add a Move
INSERT INTO Move (move_id, move_name, move_category, move_type, move_power, move_pp) 
	VALUE ([idInput], [nameInput], [categoryInput], [typeInput], [powerInput], [ppInput])
	
-- Update a pokemon
UPDATE Pokemon SET name = [nameInput] WHERE id = [idInput]

-- Update a MOVE
UPDATE Move SET type = [typeInput] WHERE namme = [nameInput]
	
-- delete a pokemon
DELETE FROM Pokemon WHERE Pokemon.name = [pokemon_id_selected_from_update_form]
