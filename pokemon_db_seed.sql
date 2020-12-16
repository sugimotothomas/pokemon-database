-- For the Pokemon DATABASE
-- Created by Thomas Sugimoto
-- 7/25/2018
-- For use in the class CS 340
-- Initial queries to build the database (also know as the seed)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*
----------------------------------------------------
-- Table structure for table `Pokemon`
----------------------------------------------------
*/

DROP TABLE IF EXISTS `Pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pokemon` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type1` int(11) NOT NULL,
  `type2` int(11) DEFAULT 0,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `type1` (`type1`),
  KEY `type2` (`type2`),
  CONSTRAINT `IsType1` FOREIGN KEY (`type1`) REFERENCES `Types` (`type_id`),
  CONSTRAINT `IsType2` FOREIGN KEY (`type2`) REFERENCES `Types` (`type_id`)
  
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
----------------------------------------------------
-- Table structure for table `Types``
----------------------------------------------------
*/
DROP TABLE IF EXISTS `Types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*
----------------------------------------------------
-- Table structure for table `Move`
----------------------------------------------------
*/
DROP TABLE IF EXISTS `Move`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Move` (
  `move_id` int(11) NOT NULL AUTO_INCREMENT,
  `move_name` varchar(255) NOT NULL,
  `move_category` varchar(255) NOT NULL,
  `move_type` int(11) NOT NULL,
  `move_power` int(11) DEFAULT 0,
  `move_pp` int(11) NOT NULL,
  PRIMARY KEY (`move_id`),
  UNIQUE KEY `move_name` (`move_name`),
  KEY `move_type` (`move_type`),
  CONSTRAINT `Has` FOREIGN KEY (`move_type`) REFERENCES `Types` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*
----------------------------------------------------
-- Table structure for table `Location`
----------------------------------------------------
*/
DROP TABLE IF EXISTS `Location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) NOT NULL,
  `location_description` varchar(255),
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*
----------------------------------------------------
-- Table structure for table `IsFoundIn`
----------------------------------------------------
*/
DROP TABLE IF EXISTS `IsFoundIn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IsFoundIn` (
  `pokemon` int(11) NOT NULL DEFAULT 0,
  `location` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`pokemon`, `location`),
  CONSTRAINT `IsFoundIn_1` FOREIGN KEY (`pokemon`) REFERENCES `Pokemon` (`id`),
  CONSTRAINT `ISFoundIn_2` FOREIGN KEY (`location`) REFERENCES `Location` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*
---------------------------------------------------- 
-- Table structure for table 'CanLearn'
----------------------------------------------------
*/
DROP TABLE IF EXISTS `CanLearn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CanLearn` (
  `pokemon` int(11) NOT NULL DEFAULT 0,
  `move` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`pokemon`, `move`),
  CONSTRAINT `CanLearn_1` FOREIGN KEY (`pokemon`) REFERENCES `Pokemon` (`id`),
  CONSTRAINT `CanLearn_2` FOREIGN KEY (`move`) REFERENCES `Move` (`move_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*
----------------------------------------------------
-- Table structure for table `EvolvesInto`
----------------------------------------------------
*/
DROP TABLE IF EXISTS `EvolvesInto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `EvolvesInto` (
  `evolvesFrom` int(11) NOT NULL DEFAULT 0,
  `evolvesInto` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`evolvesFrom`, `evolvesInto`),
  CONSTRAINT `EvolvesInto_1` FOREIGN KEY (`evolvesFrom`) REFERENCES `Pokemon` (`id`),
  CONSTRAINT `EvolvesInto_2` FOREIGN KEY (`evolvesInto`) REFERENCES `Pokemon` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--

--
-- Dumping data for table `Pokemon`
--

LOCK TABLES `Pokemon` WRITE;
/*!40000 ALTER TABLE `Pokemon` DISABLE KEYS */;
INSERT INTO `Pokemon` VALUES 
(1, 'Bulbasaur', 12, 4, 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.'),
(2, 'Ivysaur', 12, 4, 'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.'),
(3, 'Venusaur', 12, 4, 'The plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.'),
(4, 'Charmander', 10, 0, 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.'),
(5, 'Charmeleon', 10, 0, 'When it swings its burning tail, it elevates the temperature to unbearably high levels.'),
(6, 'Charizard', 10, 3, 'Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally.'),
(7, 'Squirtle', 11, 0, 'After birth, its back swells and hardens into a shell. Powerfully sprays foam from its mouth.'),
(8, 'Wartortle', 11, 0, 'Often hides in water to stalk unwary prey. For swimming fast, it moves its ears to maintain balance.'),
(9, 'Blastoise', 11, 0, 'A brutal Pokémon with pressurized water jets on its shell. They are used for high speed tackles.'),
(10, 'Caterpie', 7, 0, 'Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.'),
(11, 'Metapod', 7, 0, 'This Pokémon is vulnerable to attack while its shell is soft, exposing its weak and tender body.'),
(12, 'Butterfree', 7, 3, 'In battle, it flaps its wings at high speed to release highly toxic dust into the air.'),
(13, 'Weedle', 7, 4, 'Often found in forests, eating leaves. It has a sharp venomous stinger on its head.'),
(14, 'Kakuna', 7, 4, 'Almost incapable of moving, this Pokémon can only harden its shell to protect itself from predators.'),
(15, 'Beedrill', 7, 4, 'Flies at high speed and attacks using its large venomous stingers on its forelegs and tail.'),
(16, 'Pidgey', 1, 3, 'A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.'),
(17, 'Pidgeotto', 1, 3, 'Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder.'),
(18, 'Pidgeot', 1, 3, 'When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.'), 
(19, 'Rattata', 1, 0, 'Bites anything when it attacks. Small and very quick, it is a common sight in many places.'),
(20, 'Raticate', 1, 0, 'It uses its whiskers to maintain its balance. It apparently slows down if they are cut off.'),
(21, 'Spearow', 1, 3, 'Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.'),
(22, 'Fearow', 1, 3, 'With its huge and magnificent wings, it can keep aloft without ever having to land for rest.'),
(23, 'Ekans', 4, 0, 'Moves silently and stealthily. Eats the eggs of birds, such as Pidgey and Spearow, whole.'),
(24, 'Arbok', 4, 0, 'It is rumored that the ferocious warning markings on its belly differ from area to area.'),
(25, 'Pikachu', 13, 0, 'When several of these Pokémon gather, their electricity could build and cause lightning storms.'),
(26, 'Raichu', 13, 0, 'Its long tail serves as a ground to protect itself from its own high voltage power.'),
(27, 'Sandshrew', 5, 0, 'Burrows deep underground in arid locations far from water. It only emerges to hunt for food.'),
(28, 'Sandslash', 5, 0, 'Curls up into a spiny ball when threatened. It can roll while curled up to attack or escape.'),
(29, 'Nidoran-f', 4, 0, 'Although small, its venomous barbs render this Pokémon dangerous. The female has smaller horns.'),
(30, 'Nidorina', 4, 0, 'The female''s horn develops slowly. Prefers physical attacks such as clawing and biting.'),
(31, 'Nidoqueen', 4, 5, 'Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.'),
(32, 'Nidoran-m', 4, 0, 'Stiffens its ears to sense danger. The larger its horns, the more powerful its secreted venom.'),
(33, 'Nidorino', 4, 0, 'An aggressive Pokémon that is quick to attack. The horn on its head secretes a powerful venom.'),
(34, 'Nidoking', 4, 5, 'It uses its powerful tail in battle to smash, constrict, then break the prey''s bones.'),
(35, 'Clefairy', 1, 0, 'Its magical and cute appeal has many admirers. It is rare and found only in certain areas.'),
(36, 'Clefable', 1, 0, 'A timid fairy Pokémon that is rarely seen. It will run and hide the moment it senses people.'),
(37, 'Vulpix', 10, 0, 'At the time of birth, it has just one tail. The tail splits from its tip as it grows older.'),
(38, 'Ninetales', 10, 0, 'Very smart and very vengeful. Grabbing one of its many tails could result in a 1000-year curse.'),
(39, 'Jigglypuff', 1, 0, 'When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.'),
(40, 'Wigglytuff', 1, 0, 'The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.'),
(41, 'Zubat', 4, 3, 'Forms colonies in perpetually dark places. Uses ultrasonic waves to identify and approach targets.'),
(42, 'Golbat', 4, 3, 'Once it strikes, it will not stop draining energy from the victim even if it gets too heavy to fly.'),
(43, 'Oddish', 12, 4, 'During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.'),
(44, 'Gloom', 12, 4, 'The fluid that oozes from its mouth isn''t drool. It is a nectar that is used to attract prey.'),
(45, 'Vileplume', 12, 4, 'The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.'),
(46, 'Paras', 7, 12, 'Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.'),
(47, 'Parasect', 7, 12, 'A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.'),
(48, 'Venonat', 7, 4, 'Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.'),
(49, 'Venomoth', 7, 4, 'The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.'),
(50, 'Diglett',  5, 0, 'Lives about one yard underground where it feeds on plant roots. It sometimes appears above ground.'),
(51, 'Dugtrio', 5, 0, 'A team of Diglett triplets. It triggers huge earthquakes by burrowing 60 miles underground.'),
(52, 'Meowth', 1, 0, 'Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.'),
(53, 'Persian', 1, 0, 'Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.'),



(63, 'Abra', 14, 0, 'Using its ability to read minds, it will identify impending danger and Teleport to safety.'),

(74, 'Geodude', 6, 5, 'Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.'),

(94, 'Gengar', 8, 4, 'Under a full moon, this Pokémon likes to mimic the shadows of people and laugh at their fright.'),

(104, 'Cubone', 5, 0, 'Because it never removes its skull helmet, no one has ever seen this Pokémon''s real face.'),
(105, 'Marowak', 5, 0, 'The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to KO targets.'),
(106, 'Hitmonlee', 2, 0, 'When in a hurry, its legs lengthen progressively. It runs smoothly with extra long, loping strides.'),




(133, 'Eevee', 1, 0, 'Its genetic code is irregular. It may mutate if it is exposed to radiation from element Stones.'),
(134, 'Vaporeon', 11, 0, 'Lives close to water. Its long tail is ridged with a fin which is often mistaken for a mermaid''s.'),
(135, 'Jolteon', 13, 0,'It accumulates negative ions in the atmosphere to blast out 10000-volt lightning bolts.'),
(136, 'Flareon', 10, 0, 'When storing thermal energy in its body, its temperature could soar to over 1600 degrees.'),

(144, 'Articuno', 15, 3, 'A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.'),

(147, 'Dratini', 16, 0, 'Long considered a mythical Pokémon until recently when a small colony was found living underwater.'),

(151, 'Mew', 14, 0, 'So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.');

/*!40000 ALTER TABLE `Pokemon` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `Types`
--
LOCK TABLES `Types` WRITE;
/*!40000 ALTER TABLE `Types` DISABLE KEYS */;
INSERT INTO `Types` VALUE (0,  'None');
INSERT INTO `Types` VALUE (1,  'Normal');
INSERT INTO `Types` VALUE (2,  'Fighting');
INSERT INTO `Types` VALUE (3,  'Flying');
INSERT INTO `Types` VALUE (4,  'Poison');
INSERT INTO `Types` VALUE (5,  'Ground');
INSERT INTO `Types` VALUE (6,  'Rock');
INSERT INTO `Types` VALUE (7,  'Bug');
INSERT INTO `Types` VALUE (8,  'Ghost');
INSERT INTO `Types` VALUE (9,  'Steel');
INSERT INTO `Types` VALUE (10, 'Fire');
INSERT INTO `Types` VALUE (11, 'Water');
INSERT INTO `Types` VALUE (12, 'Grass');
INSERT INTO `Types` VALUE (13, 'Electric');
INSERT INTO `Types` VALUE (14, 'Psychic');
INSERT INTO `Types` VALUE (15, 'Ice');
INSERT INTO `Types` VALUE (16, 'Dragon');
INSERT INTO `Types` VALUE (17, 'Dark');
/*!40000 ALTER TABLE `Types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Move`
--

LOCK TABLES `Move` WRITE;
/*!40000 ALTER TABLE `Move` DISABLE KEYS */;
INSERT INTO `Move` VALUES 
(1, 'Pound', 'Physical', 1, 40,35),
(2, 'Karate Chop', 'Physical', 2,50,25),
(17, 'Wing Attack', 'Physical', 3, 60, 35),
(33, 'Tackle', 'Physical', 1, 40, 35),
(81, 'String Shot', 'Status', 7, 0, 40),
(106, 'Harden', 'Status', 1, 0, 30);
/*!40000 ALTER TABLE `Move` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `Location`
--

LOCK TABLES `Location` WRITE;
/*!40000 ALTER TABLE `Location` DISABLE KEYS */;
INSERT INTO `Location` VALUES 
(1, 'Kanto Route 25', 'A path that winds through the forest and comes out overlooking the sea.'),
(2, 'Viridian Forest', 'A deep and sprawling forest that extends around Viridian City. A natural maze, many people become lost inside.'),
(3, 'Kanto Route 26', 'An unimaginably difficult mountain road that gives the impression of a test.');
/*!40000 ALTER TABLE `Location` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `IsFoundIn`
--

LOCK TABLES `IsFoundIn` WRITE;
/*!40000 ALTER TABLE `IsFoundIn` DISABLE KEYS */;
INSERT INTO `IsFoundIn` VALUE 
(10, 1),(11,1),(13,1),(14,1),(16,1),(17,1),(43,1),(48,1),(63,1),
(10,2),(11,2),(13,2),(14,2),(16,2),(17,2),(25,2),
(20,3),(24,3),(28,3);
/*!40000 ALTER TABLE `IsFoundIn` ENABLE KEYS */;
UNLOCK TABLES;


-- Dumping data for table `EvolvesInto`
--
LOCK TABLES `EvolvesInto` WRITE;
/*!40000 ALTER TABLE `EvolvesInto` DISABLE KEYS */;
INSERT INTO `EvolvesInto` VALUE 
(1, 2),(2, 3),
(4, 5),(5, 6),
(7, 8),(8, 9),
(10,11),(11,12),
(13,14),(14,15),
(16,17),(17,18),
(19,20),
(21,22),
(23,24),
(25,26),
(27,28),
(29,30),(30,31),
(32,33),(33,34),
(35,36),
(37,38),
(39,40),
(41,42),
(43,44),(44,45),
(46,47),
(48,49),
(50,51),
(52,53),

(104,105),

(133, 134),
(133, 135),
(133, 136);
/*!40000 ALTER TABLE `EvolvesInto` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Dumping Data for table 'CanLearn
--
LOCK TABLES `CanLearn` WRITE;
/*!40000 ALTER TABLE `CanLearn` DISABLE KEYS */;
INSERT INTO `CanLearn` VALUE 
(35,1),(39,1),--

(6,17),(16,17),(17,17),(18,17),(41,17),(42,17),--

(1,33),(2,33),(3,33),(7,33),(8,33),(9,33),(10,33),(16,33),(17,33),(18,33),(19,33),(20,33),(29,33),
(30,33),(31,33),(32,33),(33,33),(34,33),(48,33),(49,33),(133,33),(134,33),(135,33),(136,33),

(10,81),(13,81),
(11,106),(14,106);
/*!40000 ALTER TABLE `CanLearn` ENABLE KEYS */;
UNLOCK TABLES;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

