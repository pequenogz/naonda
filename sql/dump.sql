-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: naonda
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.30-MariaDB

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

--
-- Table structure for table `spot`
--

DROP TABLE IF EXISTS `spot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_region` int(2) DEFAULT NULL,
  `id_water` int(2) DEFAULT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `id_wave_length` int(2) DEFAULT NULL,
  `id_swell_strength` int(2) DEFAULT NULL,
  `id_localism` int(2) DEFAULT NULL,
  `id_conflict` int(2) DEFAULT NULL,
  `rating` int(1) DEFAULT '1',
  `srv_shower` int(1) DEFAULT '0',
  `srv_parking` int(1) DEFAULT '0',
  `srv_hostelry` int(1) DEFAULT '0',
  `srv_life_guard` int(1) DEFAULT '0',
  `srv_wc` int(1) DEFAULT '0',
  `srv_wifi` int(1) DEFAULT '0',
  `bodyboard` int(1) DEFAULT '0',
  `van` int(1) DEFAULT '0',
  `active` int(1) DEFAULT '0',
  `idForecast` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `idForecast_UNIQUE` (`idForecast`),
  KEY `fk_region_idx` (`id_region`),
  KEY `fk_water_idx` (`id_water`),
  KEY `fk_spot_wave_length_idx` (`id_wave_length`),
  KEY `fk_spot_swell_strength_idx` (`id_swell_strength`),
  KEY `fk_spot_localism_idx` (`id_localism`),
  KEY `fk_spot_conflict_idx` (`id_conflict`),
  CONSTRAINT `fk_spot_conflict` FOREIGN KEY (`id_conflict`) REFERENCES `spot_conflict` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_spot_localism` FOREIGN KEY (`id_localism`) REFERENCES `spot_localism` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_spot_region` FOREIGN KEY (`id_region`) REFERENCES `spot_region` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_spot_swell_strength` FOREIGN KEY (`id_swell_strength`) REFERENCES `spot_swell_strength` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_spot_water` FOREIGN KEY (`id_water`) REFERENCES `spot_water` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_spot_wave_length` FOREIGN KEY (`id_wave_length`) REFERENCES `spot_wave_length` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot`
--

LOCK TABLES `spot` WRITE;
/*!40000 ALTER TABLE `spot` DISABLE KEYS */;
INSERT INTO `spot` VALUES (1,'A Frouxeira',1,2,43.6113889,-8.1641667,NULL,1,2,2,4,1,1,1,1,1,0,0,1,1,4376),(2,'Aguieira',1,2,42.7397222,-8.9694444,NULL,3,2,2,3,1,1,1,1,1,0,0,1,0,NULL),(3,'Baldaio',1,3,43.2991667,-8.6547222,NULL,2,2,5,3,1,1,1,1,0,0,0,0,0,NULL),(4,'Baleo',1,2,43.6450000,-8.1025000,NULL,1,1,5,2,0,0,0,0,0,0,0,0,0,NULL),(5,'Bares',1,3,43.7702778,-7.6750000,2,3,1,5,2,1,1,1,1,1,0,0,1,0,NULL),(6,'Baroña',1,3,42.6905556,-9.0277778,NULL,2,1,5,3,1,1,0,0,1,0,0,0,0,NULL),(7,'Cabeiro',1,2,42.7338889,-8.9925000,NULL,3,1,5,1,1,1,1,1,1,0,0,0,0,NULL),(8,'Caión',1,3,43.3105556,-8.5575000,NULL,1,1,5,3,0,0,0,0,0,0,0,0,1,4370),(9,'Campelo',1,2,43.5825000,-8.2144444,NULL,1,1,2,4,1,1,0,0,0,0,0,0,1,181),(10,'Cano Grande',1,2,43.6088889,-8.1919444,NULL,1,1,5,1,0,1,0,0,1,0,0,0,0,NULL),(11,'Cariño',1,3,43.7316667,-7.8708333,NULL,3,1,5,2,1,1,0,0,0,0,0,1,0,NULL),(12,'Carnota',1,2,42.8275000,-9.1050000,NULL,2,3,5,2,0,1,0,1,0,0,0,0,0,NULL),(13,'Casal',1,2,43.5705556,-8.2550000,NULL,1,1,5,2,0,0,0,0,0,0,0,0,0,NULL),(14,'Chanteiro',1,2,43.4455556,-8.3022222,NULL,3,1,5,1,1,1,0,0,0,0,1,0,0,NULL),(15,'Doniños',1,2,43.5025000,-8.3213889,NULL,1,2,2,4,1,1,1,1,1,0,1,1,1,4373),(16,'Eirón',1,3,43.7230556,-7.7963889,NULL,2,1,5,2,0,0,0,0,0,0,0,0,0,NULL),(17,'Esmelle',1,2,43.5394444,-8.2966667,NULL,2,1,5,3,1,1,0,1,1,0,0,0,1,4374),(18,'Esteiro O Barqueiro',1,3,43.7494444,-7.7230556,NULL,2,1,5,3,1,1,1,1,1,0,0,0,0,NULL),(19,'Furnas',1,3,42.6472222,-9.0363889,NULL,1,1,5,3,1,1,0,1,1,0,0,0,1,4366),(20,'Lariño',1,2,42.7655556,-9.1169444,NULL,2,1,5,3,0,1,0,1,0,0,0,0,0,NULL),(21,'Louro',1,3,42.7513889,-9.0941667,NULL,2,1,5,3,0,0,0,0,0,0,0,0,1,3562),(22,'Malpica',1,2,43.2938300,-8.7408310,NULL,3,2,2,4,1,1,1,1,1,0,0,1,0,NULL),(23,'Mar do Fora',1,3,42.9088889,-9.2733333,NULL,1,1,5,3,0,1,0,0,0,0,0,1,0,NULL),(24,'Nemiña',1,2,43.0111111,-9.2666667,NULL,2,1,5,4,1,1,0,0,0,0,0,0,1,4367),(25,'Orzán',1,2,43.3727778,-8.4036111,NULL,3,2,2,2,1,1,1,1,1,0,0,1,1,4372),(26,'Pantín',1,2,43.6391667,-8.1108333,2,1,2,2,5,1,1,1,1,1,0,0,1,1,2968),(27,'Picón',1,3,43.7388889,-7.7438889,NULL,2,1,5,3,0,0,0,0,0,0,0,0,0,NULL),(28,'Ponzos',1,2,43.5536111,-8.2705556,NULL,2,1,5,4,1,1,0,1,1,0,0,0,1,4375),(29,'Portiños',1,3,42.5802778,-9.0775000,NULL,1,3,5,2,0,0,0,0,0,0,0,0,0,NULL),(30,'Queiruga',1,3,42.6761111,-9.0308333,NULL,2,1,5,3,1,1,0,0,1,0,0,0,0,NULL),(31,'Razo',1,3,43.2991667,-8.6547222,NULL,2,2,5,3,1,1,1,1,1,0,0,1,1,4369),(32,'Rostro',1,3,42.9677778,-9.2630556,NULL,1,1,5,3,0,1,0,0,0,0,0,1,0,NULL),(33,'Sabón',1,1,43.3291667,-8.5058333,2,1,2,2,3,1,1,1,1,1,0,0,0,1,921),(34,'San Antón',1,3,43.7216667,-7.8022222,NULL,3,1,5,3,1,1,1,1,1,0,0,0,1,4377),(35,'Santa Comba',1,2,43.5552778,-8.2861111,2,3,3,5,2,1,1,0,1,1,0,0,0,0,NULL),(36,'Sarrigal',1,3,43.7344444,-7.7747222,NULL,2,3,5,2,0,0,0,0,0,0,0,0,0,NULL),(37,'Seaia',1,2,43.3275000,-8.8277778,NULL,3,1,5,1,1,1,0,0,0,0,0,0,0,NULL),(38,'Seiruga',1,2,43.3147222,-8.8575000,NULL,2,3,5,2,0,0,0,0,0,0,0,0,0,NULL),(39,'Soesto',1,3,43.2133333,-9.0216667,NULL,2,3,5,3,0,1,0,0,0,0,1,1,1,180),(40,'Vilarrube',1,2,43.6450000,-8.1025000,NULL,1,1,5,2,1,1,1,1,1,0,0,1,0,NULL),(41,'A Machacona',2,2,43.4752778,-7.3375000,NULL,3,2,2,4,0,0,0,0,0,0,0,0,0,NULL),(42,'A Marosa',2,2,43.6744444,-7.3736111,NULL,3,1,5,2,1,1,0,1,1,0,0,0,0,NULL),(43,'Arealonga',2,3,43.6063889,-7.3058333,2,3,3,5,3,1,1,1,1,1,0,0,0,0,NULL),(44,'Esteiro',2,3,43.7108333,-7.5555556,2,2,1,5,3,1,1,1,1,1,0,0,0,0,NULL),(45,'Llas',2,2,43.5791667,-7.2616667,NULL,3,1,5,3,1,1,1,1,1,0,0,0,0,NULL),(46,'Muiñelos',2,3,43.7288120,-7.5337840,NULL,2,1,5,3,0,1,0,1,0,0,0,0,1,4378),(47,'Pampillosa',2,2,42.5938889,-7.2952778,2,3,2,5,3,1,1,0,1,1,0,0,1,0,NULL),(48,'Puerto de Rinlo',2,2,43.5580556,-7.1044444,NULL,2,3,5,3,0,0,0,0,0,0,1,0,0,NULL),(49,'Ría',2,2,43.5700000,-7.2483333,2,3,2,5,3,0,0,0,0,0,0,0,0,1,182),(50,'San Bartolo',2,2,43.5669444,-7.2219444,NULL,2,1,5,4,1,1,1,1,1,0,0,0,1,4380),(51,'San Miguel de Reinante',2,2,43.5569444,-7.1758333,2,2,1,5,3,1,1,1,1,1,0,0,0,1,4379),(52,'San Román',2,2,43.7188889,-7.6252778,NULL,3,3,5,1,0,1,0,0,0,0,0,0,0,NULL),(53,'Sucastro',2,3,43.7225000,-7.5025000,2,1,3,5,1,0,0,0,0,0,0,0,0,0,NULL),(54,'A Lanzada',3,3,42.4494444,-8.8772222,NULL,3,2,5,2,1,1,1,1,1,0,0,0,1,4365),(55,'Montalbo',3,2,42.3975000,-8.8502778,NULL,3,2,5,4,1,1,1,1,1,0,0,0,0,NULL),(56,'Patos',3,2,42.1541667,-8.8250000,NULL,3,2,2,3,1,1,1,1,1,0,1,1,1,179),(57,'Punta dos Picos',3,2,41.9100000,-8.8766667,NULL,2,1,5,3,0,0,0,0,0,0,0,0,1,4714),(58,'Santa María de Oia',3,3,42.0033333,-8.8772222,NULL,2,2,1,3,0,0,0,0,0,0,1,0,1,4364),(66,'Samil',3,2,42.2093640,-8.7764230,1,2,3,5,1,1,1,1,1,1,1,0,1,0,1);
/*!40000 ALTER TABLE `spot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_bottom`
--

DROP TABLE IF EXISTS `spot_bottom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_bottom` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `bottom` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`bottom`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_bottom`
--

LOCK TABLES `spot_bottom` WRITE;
/*!40000 ALTER TABLE `spot_bottom` DISABLE KEYS */;
INSERT INTO `spot_bottom` VALUES (1,'Arena'),(2,'Roca');
/*!40000 ALTER TABLE `spot_bottom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_conflict`
--

DROP TABLE IF EXISTS `spot_conflict`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_conflict` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `conflict` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `conflict_UNIQUE` (`conflict`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_conflict`
--

LOCK TABLES `spot_conflict` WRITE;
/*!40000 ALTER TABLE `spot_conflict` DISABLE KEYS */;
INSERT INTO `spot_conflict` VALUES (2,'Conflictivo'),(3,'Muy conflictivo'),(5,'No conflictivo'),(1,'Poco conflictivo'),(4,'Radical');
/*!40000 ALTER TABLE `spot_conflict` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_direction`
--

DROP TABLE IF EXISTS `spot_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_direction` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `direction` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`direction`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_direction`
--

LOCK TABLES `spot_direction` WRITE;
/*!40000 ALTER TABLE `spot_direction` DISABLE KEYS */;
INSERT INTO `spot_direction` VALUES (3,'E'),(1,'N'),(2,'NE'),(8,'NW'),(5,'S'),(4,'SE'),(6,'SW'),(7,'W');
/*!40000 ALTER TABLE `spot_direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_localism`
--

DROP TABLE IF EXISTS `spot_localism`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_localism` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `localism` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `localism_UNIQUE` (`localism`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_localism`
--

LOCK TABLES `spot_localism` WRITE;
/*!40000 ALTER TABLE `spot_localism` DISABLE KEYS */;
INSERT INTO `spot_localism` VALUES (2,'Mucho'),(3,'No hay'),(1,'Poco');
/*!40000 ALTER TABLE `spot_localism` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_location`
--

DROP TABLE IF EXISTS `spot_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_location` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`location`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_location`
--

LOCK TABLES `spot_location` WRITE;
/*!40000 ALTER TABLE `spot_location` DISABLE KEYS */;
INSERT INTO `spot_location` VALUES (4,'Dunas'),(3,'Natural'),(6,'Otro'),(5,'Ría'),(2,'Semiurbano'),(1,'Urbano');
/*!40000 ALTER TABLE `spot_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_region`
--

DROP TABLE IF EXISTS `spot_region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_region` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `region` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`region`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_region`
--

LOCK TABLES `spot_region` WRITE;
/*!40000 ALTER TABLE `spot_region` DISABLE KEYS */;
INSERT INTO `spot_region` VALUES (1,'A Coruña'),(2,'Lugo'),(3,'Pontevedra');
/*!40000 ALTER TABLE `spot_region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_bottom`
--

DROP TABLE IF EXISTS `spot_rel_bottom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_bottom` (
  `id_spot` int(11) NOT NULL,
  `id_bottom` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_bottom`),
  KEY `fk_id_bottom_idx` (`id_bottom`),
  CONSTRAINT `fk_id_bottom_rel` FOREIGN KEY (`id_bottom`) REFERENCES `spot_bottom` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_bottom_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_bottom`
--

LOCK TABLES `spot_rel_bottom` WRITE;
/*!40000 ALTER TABLE `spot_rel_bottom` DISABLE KEYS */;
INSERT INTO `spot_rel_bottom` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(7,2),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(13,2),(14,1),(15,1),(16,1),(16,2),(17,1),(18,1),(19,1),(20,1),(21,1),(22,1),(23,1),(24,1),(25,1),(26,1),(27,1),(28,1),(29,1),(30,1),(31,1),(32,1),(33,1),(34,1),(35,1),(36,1),(37,1),(38,1),(39,1),(40,1),(41,2),(42,1),(43,1),(43,2),(44,1),(45,1),(45,2),(46,1),(47,1),(48,1),(48,2),(49,1),(50,1),(51,1),(52,1),(52,2),(53,1),(54,1),(55,1),(56,1),(56,2),(57,1),(57,2),(58,2),(66,1);
/*!40000 ALTER TABLE `spot_rel_bottom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_location`
--

DROP TABLE IF EXISTS `spot_rel_location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_location` (
  `id_spot` int(11) NOT NULL,
  `id_location` int(2) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_spot`),
  KEY `fk_id_location_idx` (`id_location`),
  CONSTRAINT `fk_id_location_rel` FOREIGN KEY (`id_location`) REFERENCES `spot_location` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_location_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_location`
--

LOCK TABLES `spot_rel_location` WRITE;
/*!40000 ALTER TABLE `spot_rel_location` DISABLE KEYS */;
INSERT INTO `spot_rel_location` VALUES (1,4,NULL),(2,3,NULL),(3,3,NULL),(4,3,NULL),(5,2,NULL),(6,3,NULL),(7,2,NULL),(8,3,NULL),(9,3,NULL),(10,3,NULL),(11,3,NULL),(12,3,NULL),(13,3,NULL),(14,6,'Extremo Occidental Ría de Ferrol'),(15,3,NULL),(16,3,NULL),(17,3,NULL),(18,4,NULL),(19,3,NULL),(20,6,'Entre Punta de Insua y Punta de Lens'),(21,3,NULL),(22,2,NULL),(23,3,NULL),(24,4,NULL),(25,1,NULL),(26,3,NULL),(27,1,NULL),(28,3,NULL),(29,4,NULL),(30,3,NULL),(31,3,NULL),(32,4,NULL),(33,1,NULL),(34,3,NULL),(35,4,NULL),(36,3,NULL),(37,6,'Carretera Ermita San Adrián'),(38,3,NULL),(39,3,NULL),(40,6,'Frente a Cedeira'),(41,6,'Entre Punta de Cabras y Punta de Cabrón'),(42,6,'Afueras de Burela'),(43,6,'Debajo del castro Celta de Fazouro'),(44,3,NULL),(45,3,NULL),(46,3,NULL),(47,6,'Río Ouro'),(48,6,'Frente a la Bocana del puerto'),(49,6,'Boca de la ría de Foz'),(50,1,NULL),(51,1,NULL),(52,3,NULL),(53,3,NULL),(54,3,NULL),(55,3,NULL),(56,3,NULL),(57,3,NULL),(58,6,'Oia'),(66,1,NULL);
/*!40000 ALTER TABLE `spot_rel_location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_swell_direction`
--

DROP TABLE IF EXISTS `spot_rel_swell_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_swell_direction` (
  `id_spot` int(11) NOT NULL,
  `id_direction` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_direction`),
  KEY `fk_swell_direction_rel_idx` (`id_direction`),
  CONSTRAINT `fk_swell_direction_rel` FOREIGN KEY (`id_direction`) REFERENCES `spot_direction` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_swell_direction_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_swell_direction`
--

LOCK TABLES `spot_rel_swell_direction` WRITE;
/*!40000 ALTER TABLE `spot_rel_swell_direction` DISABLE KEYS */;
INSERT INTO `spot_rel_swell_direction` VALUES (1,8),(2,7),(3,7),(4,8),(5,8),(6,7),(7,7),(8,7),(9,8),(10,8),(11,8),(12,7),(12,8),(13,8),(14,7),(14,8),(15,7),(15,8),(16,8),(17,7),(17,8),(18,1),(18,8),(19,7),(20,7),(21,7),(22,7),(23,7),(24,7),(25,7),(26,8),(27,8),(28,8),(29,7),(30,7),(31,7),(32,7),(33,7),(34,8),(35,8),(36,8),(37,7),(38,7),(38,8),(39,7),(40,8),(41,8),(42,8),(43,8),(44,8),(45,8),(46,8),(47,8),(48,8),(49,1),(50,8),(51,8),(52,8),(53,8),(54,6),(54,7),(54,8),(55,7),(56,7),(57,7),(58,1),(66,3);
/*!40000 ALTER TABLE `spot_rel_swell_direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_tide`
--

DROP TABLE IF EXISTS `spot_rel_tide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_tide` (
  `id_spot` int(11) NOT NULL,
  `id_tide` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_tide`),
  KEY `fk_id_tide_rel_idx` (`id_tide`),
  CONSTRAINT `fk_id_tide_rel` FOREIGN KEY (`id_tide`) REFERENCES `spot_tide` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_tide_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_tide`
--

LOCK TABLES `spot_rel_tide` WRITE;
/*!40000 ALTER TABLE `spot_rel_tide` DISABLE KEYS */;
INSERT INTO `spot_rel_tide` VALUES (1,2),(2,4),(3,1),(3,3),(4,2),(5,4),(6,2),(6,4),(7,2),(7,4),(8,4),(9,2),(9,3),(10,2),(11,2),(11,4),(12,2),(13,2),(14,2),(15,1),(15,4),(16,2),(17,2),(18,2),(19,2),(20,4),(21,2),(21,4),(22,2),(22,4),(23,4),(24,2),(24,4),(25,2),(25,4),(26,2),(27,2),(27,4),(28,2),(28,4),(29,4),(30,4),(31,1),(31,3),(32,4),(33,4),(33,5),(34,2),(34,4),(35,4),(36,2),(36,4),(37,2),(37,4),(38,2),(39,6),(40,4),(41,4),(41,5),(42,6),(43,2),(43,4),(44,4),(45,1),(46,2),(47,4),(47,5),(48,2),(49,2),(50,2),(50,4),(51,1),(51,4),(52,2),(53,2),(53,4),(54,1),(54,4),(55,1),(55,2),(55,4),(56,1),(56,4),(57,4),(58,3),(58,4),(66,1),(66,4);
/*!40000 ALTER TABLE `spot_rel_tide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_time`
--

DROP TABLE IF EXISTS `spot_rel_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_time` (
  `id_spot` int(11) NOT NULL,
  `id_time` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_time`),
  KEY `fk_id_time_rel_idx` (`id_time`),
  CONSTRAINT `fk_id_time_rel` FOREIGN KEY (`id_time`) REFERENCES `spot_time` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_time_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_time`
--

LOCK TABLES `spot_rel_time` WRITE;
/*!40000 ALTER TABLE `spot_rel_time` DISABLE KEYS */;
INSERT INTO `spot_rel_time` VALUES (1,5),(2,4),(3,5),(4,5),(5,4),(6,2),(6,3),(7,3),(7,4),(8,2),(8,3),(9,2),(10,2),(10,3),(11,4),(12,3),(13,2),(13,3),(14,3),(15,1),(15,2),(16,2),(16,3),(17,3),(17,4),(18,2),(18,3),(19,2),(19,3),(20,3),(21,3),(22,3),(22,4),(23,2),(23,3),(24,1),(24,2),(25,3),(26,2),(26,3),(27,2),(27,3),(28,2),(28,3),(29,2),(30,2),(30,3),(31,5),(32,2),(32,3),(33,3),(34,3),(35,3),(36,2),(36,3),(37,3),(37,4),(38,5),(39,3),(40,5),(41,3),(41,4),(42,5),(43,3),(44,5),(45,3),(45,4),(46,2),(46,3),(47,4),(48,3),(49,3),(49,4),(50,5),(51,5),(52,3),(53,5),(54,4),(55,3),(55,4),(56,3),(56,4),(57,1),(57,4),(58,3),(58,4),(66,4);
/*!40000 ALTER TABLE `spot_rel_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_wave_description`
--

DROP TABLE IF EXISTS `spot_rel_wave_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_wave_description` (
  `id_spot` int(11) NOT NULL,
  `id_wave_description` int(2) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_spot`,`id_wave_description`),
  KEY `fk_id_wave_description_rel_idx` (`id_wave_description`),
  CONSTRAINT `fk_id_wave_description_rel` FOREIGN KEY (`id_wave_description`) REFERENCES `spot_wave_decription` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_wave_description_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_wave_description`
--

LOCK TABLES `spot_rel_wave_description` WRITE;
/*!40000 ALTER TABLE `spot_rel_wave_description` DISABLE KEYS */;
INSERT INTO `spot_rel_wave_description` VALUES (1,2,NULL),(1,6,NULL),(2,2,NULL),(2,6,NULL),(4,6,NULL),(4,8,NULL),(5,6,NULL),(6,2,NULL),(6,6,NULL),(6,10,NULL),(7,2,NULL),(7,6,NULL),(9,5,NULL),(10,4,NULL),(11,6,NULL),(12,2,NULL),(12,6,NULL),(13,2,NULL),(13,8,NULL),(14,6,NULL),(15,2,NULL),(15,6,NULL),(16,6,NULL),(17,2,NULL),(17,5,NULL),(18,8,NULL),(19,2,NULL),(19,5,NULL),(20,2,NULL),(20,6,NULL),(21,2,NULL),(21,6,NULL),(22,2,NULL),(22,6,NULL),(22,10,NULL),(23,2,NULL),(23,6,NULL),(23,10,NULL),(24,2,NULL),(24,6,NULL),(24,10,NULL),(25,6,NULL),(26,6,NULL),(26,10,NULL),(27,6,NULL),(27,8,NULL),(28,2,NULL),(28,6,NULL),(29,2,NULL),(29,5,NULL),(30,2,NULL),(30,6,NULL),(32,2,NULL),(32,10,NULL),(33,2,NULL),(33,6,NULL),(35,6,NULL),(36,2,NULL),(36,6,NULL),(37,2,NULL),(37,6,NULL),(38,2,NULL),(38,6,NULL),(39,2,NULL),(40,6,NULL),(40,8,NULL),(41,5,NULL),(41,8,NULL),(42,6,NULL),(43,5,NULL),(43,6,NULL),(44,2,NULL),(44,6,NULL),(46,2,NULL),(46,6,NULL),(48,5,NULL),(50,8,NULL),(50,10,NULL),(51,2,NULL),(51,6,NULL),(52,6,NULL),(53,2,NULL),(54,2,NULL),(54,6,NULL),(54,8,NULL),(55,2,NULL),(55,5,NULL),(55,6,NULL),(56,2,NULL),(56,6,NULL),(56,10,NULL),(57,2,NULL),(57,6,NULL),(57,10,NULL),(58,2,NULL),(66,6,NULL),(66,7,NULL);
/*!40000 ALTER TABLE `spot_rel_wave_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_wave_direction`
--

DROP TABLE IF EXISTS `spot_rel_wave_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_wave_direction` (
  `id_spot` int(11) NOT NULL,
  `id_wave_direction` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_wave_direction`),
  KEY `fk_id_wave_direction_rel_idx` (`id_wave_direction`),
  CONSTRAINT `fk_id_wave_direction_rel` FOREIGN KEY (`id_wave_direction`) REFERENCES `spot_wave_direction` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_wave_direction_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_wave_direction`
--

LOCK TABLES `spot_rel_wave_direction` WRITE;
/*!40000 ALTER TABLE `spot_rel_wave_direction` DISABLE KEYS */;
INSERT INTO `spot_rel_wave_direction` VALUES (1,1),(2,2),(3,3),(4,3),(5,1),(6,3),(7,3),(8,3),(9,1),(9,2),(10,3),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(21,3),(22,3),(23,3),(24,3),(25,3),(26,3),(27,3),(28,3),(29,3),(30,3),(31,3),(32,3),(33,1),(34,3),(35,3),(36,3),(37,3),(38,3),(39,3),(40,3),(41,1),(42,3),(43,3),(44,3),(45,3),(46,2),(47,2),(48,3),(49,1),(49,2),(50,3),(51,3),(52,3),(53,3),(54,3),(55,3),(56,3),(57,3),(58,2),(66,2);
/*!40000 ALTER TABLE `spot_rel_wave_direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_wave_height`
--

DROP TABLE IF EXISTS `spot_rel_wave_height`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_wave_height` (
  `id_spot` int(11) NOT NULL,
  `id_wave` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_wave`),
  KEY `fk_wave_idx` (`id_wave`),
  CONSTRAINT `fk_id_wave_height_rel` FOREIGN KEY (`id_wave`) REFERENCES `spot_wave_height` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_wave_height_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_wave_height`
--

LOCK TABLES `spot_rel_wave_height` WRITE;
/*!40000 ALTER TABLE `spot_rel_wave_height` DISABLE KEYS */;
INSERT INTO `spot_rel_wave_height` VALUES (1,3),(1,4),(2,1),(2,4),(3,3),(3,4),(4,3),(4,4),(5,4),(6,3),(6,4),(7,3),(8,3),(9,3),(9,4),(10,3),(10,4),(11,3),(11,4),(12,4),(13,4),(14,3),(15,3),(15,4),(16,3),(17,4),(18,1),(19,3),(20,1),(20,4),(21,3),(21,4),(22,4),(23,4),(24,3),(24,4),(25,1),(25,4),(26,4),(26,5),(27,3),(27,4),(28,3),(28,4),(29,3),(29,4),(30,3),(31,3),(31,4),(32,3),(32,4),(33,4),(34,3),(34,4),(35,1),(35,4),(36,3),(36,4),(37,3),(37,4),(38,3),(39,3),(39,4),(40,4),(41,5),(42,4),(43,5),(44,3),(44,4),(45,3),(46,3),(47,5),(48,4),(49,4),(50,3),(50,4),(51,3),(51,4),(52,3),(52,4),(53,3),(53,4),(54,4),(55,4),(55,5),(56,3),(56,5),(57,4),(58,4),(58,5),(66,1);
/*!40000 ALTER TABLE `spot_rel_wave_height` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_rel_wind`
--

DROP TABLE IF EXISTS `spot_rel_wind`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_rel_wind` (
  `id_spot` int(11) NOT NULL,
  `id_direction` int(2) NOT NULL,
  PRIMARY KEY (`id_spot`,`id_direction`),
  KEY `fk_id_wind_direction_idx` (`id_direction`),
  CONSTRAINT `fk_id_wind_direction` FOREIGN KEY (`id_direction`) REFERENCES `spot_direction` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_id_wind_spot` FOREIGN KEY (`id_spot`) REFERENCES `spot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_rel_wind`
--

LOCK TABLES `spot_rel_wind` WRITE;
/*!40000 ALTER TABLE `spot_rel_wind` DISABLE KEYS */;
INSERT INTO `spot_rel_wind` VALUES (1,5),(2,5),(3,5),(3,6),(4,4),(4,5),(5,5),(5,6),(6,2),(6,4),(6,5),(7,2),(8,2),(8,4),(8,5),(9,2),(9,4),(9,5),(10,5),(11,5),(11,6),(12,2),(13,6),(14,2),(15,2),(16,4),(16,5),(17,5),(17,6),(18,2),(18,3),(19,3),(19,4),(19,5),(20,2),(21,2),(22,5),(22,6),(23,2),(24,2),(25,2),(25,4),(26,4),(26,5),(26,6),(27,5),(28,4),(28,5),(29,3),(29,4),(29,5),(30,2),(30,4),(30,5),(31,5),(31,6),(32,2),(33,5),(33,6),(34,5),(34,6),(35,5),(35,6),(36,4),(36,5),(37,5),(37,6),(38,5),(39,4),(39,5),(40,4),(40,5),(41,4),(41,6),(41,8),(42,2),(42,4),(42,5),(43,5),(44,5),(45,5),(46,4),(46,5),(47,5),(47,6),(47,8),(48,4),(48,5),(49,5),(49,6),(50,5),(50,6),(51,5),(51,6),(52,5),(52,6),(53,2),(53,4),(53,5),(54,2),(54,3),(55,2),(55,3),(56,5),(56,6),(57,2),(58,4),(58,5),(66,7);
/*!40000 ALTER TABLE `spot_rel_wind` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_swell_strength`
--

DROP TABLE IF EXISTS `spot_swell_strength`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_swell_strength` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `strength` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `strength_UNIQUE` (`strength`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_swell_strength`
--

LOCK TABLES `spot_swell_strength` WRITE;
/*!40000 ALTER TABLE `spot_swell_strength` DISABLE KEYS */;
INSERT INTO `spot_swell_strength` VALUES (3,'Fuerte'),(2,'Medio'),(1,'Pequeño');
/*!40000 ALTER TABLE `spot_swell_strength` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_tide`
--

DROP TABLE IF EXISTS `spot_tide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_tide` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `tide` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`tide`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_tide`
--

LOCK TABLES `spot_tide` WRITE;
/*!40000 ALTER TABLE `spot_tide` DISABLE KEYS */;
INSERT INTO `spot_tide` VALUES (1,'Alta'),(2,'Baja'),(5,'Bajando'),(3,'Media'),(4,'Subiendo'),(6,'Todas');
/*!40000 ALTER TABLE `spot_tide` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_time`
--

DROP TABLE IF EXISTS `spot_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_time` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `time` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `time_UNIQUE` (`time`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_time`
--

LOCK TABLES `spot_time` WRITE;
/*!40000 ALTER TABLE `spot_time` DISABLE KEYS */;
INSERT INTO `spot_time` VALUES (4,'Invierno'),(3,'Otoño'),(1,'Primavera'),(5,'Todo el año'),(2,'Verano');
/*!40000 ALTER TABLE `spot_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_water`
--

DROP TABLE IF EXISTS `spot_water`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_water` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `water` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`water`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_water`
--

LOCK TABLES `spot_water` WRITE;
/*!40000 ALTER TABLE `spot_water` DISABLE KEYS */;
INSERT INTO `spot_water` VALUES (3,'Limpia'),(1,'Muy contaminada'),(2,'Poco contaminada');
/*!40000 ALTER TABLE `spot_water` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_wave_decription`
--

DROP TABLE IF EXISTS `spot_wave_decription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_wave_decription` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_wave_decription`
--

LOCK TABLES `spot_wave_decription` WRITE;
/*!40000 ALTER TABLE `spot_wave_decription` DISABLE KEYS */;
INSERT INTO `spot_wave_decription` VALUES (4,'Cerrona'),(10,'Con secciones tuberas'),(8,'Contundente'),(1,'Lenta'),(6,'Maniobrable'),(3,'Muy rápida'),(7,'Orillera'),(9,'Otro'),(2,'Rápida'),(5,'Tubera');
/*!40000 ALTER TABLE `spot_wave_decription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_wave_direction`
--

DROP TABLE IF EXISTS `spot_wave_direction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_wave_direction` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `direction` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`direction`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_wave_direction`
--

LOCK TABLES `spot_wave_direction` WRITE;
/*!40000 ALTER TABLE `spot_wave_direction` DISABLE KEYS */;
INSERT INTO `spot_wave_direction` VALUES (1,'Derecha'),(2,'Izquierda'),(3,'Picos variables');
/*!40000 ALTER TABLE `spot_wave_direction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_wave_height`
--

DROP TABLE IF EXISTS `spot_wave_height`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_wave_height` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `height` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `height_UNIQUE` (`height`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_wave_height`
--

LOCK TABLES `spot_wave_height` WRITE;
/*!40000 ALTER TABLE `spot_wave_height` DISABLE KEYS */;
INSERT INTO `spot_wave_height` VALUES (1,'Metro','2 m'),(2,'Metropasado','2 - 2.5 m'),(3,'Metrazo','2 - 2.5 m + power'),(4,'Metro y medio','+2.5 m'),(5,'Dos metros','3.5 m');
/*!40000 ALTER TABLE `spot_wave_height` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spot_wave_length`
--

DROP TABLE IF EXISTS `spot_wave_length`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `spot_wave_length` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `length` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`length`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spot_wave_length`
--

LOCK TABLES `spot_wave_length` WRITE;
/*!40000 ALTER TABLE `spot_wave_length` DISABLE KEYS */;
INSERT INTO `spot_wave_length` VALUES (1,'Corta'),(2,'Larga'),(3,'Muy larga');
/*!40000 ALTER TABLE `spot_wave_length` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `surname` varchar(45) DEFAULT NULL,
  `mail` varchar(75) NOT NULL,
  `level` int(2) NOT NULL DEFAULT '1',
  `img_name` varchar(45) DEFAULT NULL,
  `img` longblob,
  `password` varchar(300) NOT NULL,
  `token` varchar(300) NOT NULL,
  `id_role` int(2) NOT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_name` (`user_name`),
  UNIQUE KEY `uq_mail` (`mail`),
  KEY `fk_level_idx` (`level`),
  KEY `fk_role_idx` (`id_role`),
  CONSTRAINT `fk_level` FOREIGN KEY (`level`) REFERENCES `user_level` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_role` FOREIGN KEY (`id_role`) REFERENCES `user_role` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'pequenogz','Xan','Fernández','pequenogz@gmail.com',2,'','','$2y$10$CqnImYYiTbBqL8DwQzFCGuBKo9S3qHm.3QjzEZR2SlcL2/GpTGK9G','3974234105aeeb2b0421869.46647292',2),(2,'pequeno',NULL,NULL,'pequeno@gmail.com',1,NULL,NULL,'$2y$10$JkOrRMzyCY2lavcKfJ4nG.muOuveBIzQebkSR76PtsUGBkwm4f2lm','10626811065b103ab4bcbf41.99388003',2),(3,'triska',NULL,NULL,'triska@gmail.com',1,NULL,NULL,'$2y$10$XC3PoSk.FV70YQ0ASN.jv.NlVhDDvhrlMmgiK7HJKfHcxv8uLBa.C','5174494845b12d7c7e96426.85744474',2),(4,'admin',NULL,NULL,'admin@naonda.gal',1,NULL,NULL,'$2y$10$Z9Xcm0pXwb0TJFrhVKI/beRGTN/nHjG0c0WQ/2ERNG/wHwsN05y9e','11964515455b1ec904ca11e4.24747245',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_historic`
--

DROP TABLE IF EXISTS `user_historic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_historic` (
  `id_user` int(11) NOT NULL,
  `id_forecast` int(11) NOT NULL,
  `local_timestamp` datetime NOT NULL,
  `min_breaking_height` decimal(5,2) DEFAULT NULL,
  `max_breaking_height` decimal(5,2) DEFAULT NULL,
  `wave_1_height` decimal(5,2) DEFAULT NULL,
  `wave_1_period` int(2) DEFAULT NULL,
  `wave_1_direction` decimal(5,2) DEFAULT NULL,
  `wave_2_height` decimal(5,2) DEFAULT NULL,
  `wave_2_period` int(2) DEFAULT NULL,
  `wave_2_direction` decimal(5,2) DEFAULT NULL,
  `wave_3_height` decimal(5,2) DEFAULT NULL,
  `wave_3_period` int(2) DEFAULT NULL,
  `wave_3_direction` decimal(5,2) DEFAULT NULL,
  `wind_speed` int(3) DEFAULT NULL,
  `wind_gusts` int(3) DEFAULT NULL,
  `wind_direction` decimal(5,2) DEFAULT NULL,
  `weather` varchar(5) DEFAULT NULL,
  `temperature` int(2) DEFAULT NULL,
  `rate` int(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_forecast`,`local_timestamp`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_historic`
--

LOCK TABLES `user_historic` WRITE;
/*!40000 ALTER TABLE `user_historic` DISABLE KEYS */;
INSERT INTO `user_historic` VALUES (1,179,'2018-06-10 00:00:00',1.30,2.00,1.70,11,115.93,0.40,6,177.43,NULL,NULL,NULL,21,27,10.00,'12',14,-1),(1,179,'2018-06-10 03:00:00',0.80,1.30,1.50,6,120.06,1.10,11,123.27,NULL,NULL,NULL,18,23,106.00,'22',15,-1),(1,179,'2018-06-10 09:00:00',0.90,1.40,1.60,7,122.52,0.80,11,126.35,NULL,NULL,NULL,8,10,100.00,'34',15,1),(1,179,'2018-06-10 15:00:00',0.80,1.30,1.40,7,126.96,0.70,11,127.42,0.20,12,101.71,16,18,115.00,'1',16,1),(1,179,'2018-06-10 18:00:00',0.70,1.10,1.40,7,134.42,0.60,10,128.14,0.30,11,104.81,13,15,120.00,'1',16,1),(1,4376,'2018-06-10 09:00:00',0.60,1.00,1.00,8,119.96,0.60,11,139.91,NULL,NULL,NULL,5,11,279.00,'2',16,1),(1,4376,'2018-06-10 12:00:00',0.60,1.00,0.90,7,123.52,0.60,11,139.82,NULL,NULL,NULL,8,11,206.00,'1',19,-1),(1,4376,'2018-06-14 09:00:00',0.30,0.50,0.40,8,149.15,0.50,6,182.65,NULL,NULL,NULL,2,5,129.00,'1',19,-1),(1,4376,'2018-06-14 18:00:00',0.60,0.90,0.80,8,136.13,0.30,5,194.41,NULL,NULL,NULL,6,10,161.00,'1',18,1);
/*!40000 ALTER TABLE `user_historic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_level`
--

DROP TABLE IF EXISTS `user_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_level` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `level` varchar(45) NOT NULL,
  `description` varchar(90) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`level`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_level`
--

LOCK TABLES `user_level` WRITE;
/*!40000 ALTER TABLE `user_level` DISABLE KEYS */;
INSERT INTO `user_level` VALUES (1,'Principiante','Persona que está empezando, coge espumas y está aprendiendo a ponerse de pie.'),(2,'Intermedio','Ya surfea la pared de la ola y realiza pequeñas maniobras con éxito.'),(3,'Avanzado','Surfista que conecta varias maniobras con fuerza y genera velocidad.'),(4,'Pro','Surfista que realiza todo tipo de maniobras potentes en todas las condiciones.');
/*!40000 ALTER TABLE `user_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,'admin'),(2,'user without validating mail'),(3,'user');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vst_spots_description`
--

DROP TABLE IF EXISTS `vst_spots_description`;
/*!50001 DROP VIEW IF EXISTS `vst_spots_description`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vst_spots_description` AS SELECT 
 1 AS `idForecast`,
 1 AS `name`,
 1 AS `region`,
 1 AS `rating`,
 1 AS `location`,
 1 AS `latitude`,
 1 AS `longitude`,
 1 AS `time`,
 1 AS `bottom`,
 1 AS `tide`,
 1 AS `water`,
 1 AS `height`,
 1 AS `wave`,
 1 AS `wind`,
 1 AS `swell`,
 1 AS `localism`,
 1 AS `shower`,
 1 AS `parking`,
 1 AS `hostelry`,
 1 AS `life_guard`,
 1 AS `wc`,
 1 AS `wifi`,
 1 AS `bodyboard`,
 1 AS `van`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vst_spots_edit_main`
--

DROP TABLE IF EXISTS `vst_spots_edit_main`;
/*!50001 DROP VIEW IF EXISTS `vst_spots_edit_main`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vst_spots_edit_main` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `region`,
 1 AS `location`,
 1 AS `latitude`,
 1 AS `longitude`,
 1 AS `water`,
 1 AS `wave_length`,
 1 AS `swell_strength`,
 1 AS `localism`,
 1 AS `conflict`,
 1 AS `rating`,
 1 AS `shower`,
 1 AS `parking`,
 1 AS `hostelry`,
 1 AS `life_guard`,
 1 AS `wc`,
 1 AS `wifi`,
 1 AS `bodyboard`,
 1 AS `van`,
 1 AS `active`,
 1 AS `forecast`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vst_spots_main`
--

DROP TABLE IF EXISTS `vst_spots_main`;
/*!50001 DROP VIEW IF EXISTS `vst_spots_main`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `vst_spots_main` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `region`,
 1 AS `latitude`,
 1 AS `longitude`,
 1 AS `rating`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'naonda'
--
/*!50003 DROP PROCEDURE IF EXISTS `prc_spot_save` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_spot_save`(
	IN pIdSpot TEXT
,	IN pName TEXT
,	IN pRegion TEXT
,	IN pLocation TEXT
,	IN pLatitude TEXT
,	IN pLongitude TEXT
,	IN pTime TEXT
,	IN pBottom TEXT
,	IN pTide TEXT
,	IN pWater TEXT
,	IN pHeight TEXT
,	IN pLength TEXT
,	IN pWaveDirection TEXT
,	IN pDescription TEXT
,	IN pWind TEXT
,	IN pStrength TEXT
,	IN pSwell TEXT
,	IN pLocalism TEXT
,	IN pConflict TEXT
,	IN pShower TEXT
,	IN pParking TEXT
,	IN pHostelry TEXT
,	IN pLifeGuard TEXT
,	IN pWc TEXT
,	IN pWifi TEXT
,	IN pBodyboard TEXT
,	IN pVan TEXT
,	IN pRating TEXT
,	IN pForecast TEXT
,	IN pActive TEXT)
BEGIN

	DECLARE _id INT;
    DECLARE _next TEXT DEFAULT NULL;
	DECLARE _nextlen INT DEFAULT NULL;
	DECLARE _value TEXT DEFAULT NULL;
    
    IF (pName IS NOT NULL AND LENGTH(pIdSpot) > 0) THEN

		IF (pIdSpot IS NOT NULL AND LENGTH(TRIM(pIdSpot)) > 0 AND TRIM(pIdSpot) <> 0) THEN

			UPDATE
				naonda.spot
			
            SET
				name = IF(TRIM(pName) = '', NULL, pName)
			,	id_region = IF(pRegion = 0, NULL, pRegion)
            ,	id_water = IF(pWater = 0, NULL, pWater)
            ,	latitude = IF(pLatitude = 0, NULL, pLatitude)
            ,	longitude = IF(pLongitude = 0, NULL, pLongitude)
            ,	id_wave_length = IF(pLength = 0, NULL, pLength)
            ,	id_swell_strength = IF(pStrength = 0, NULL, pStrength)
            ,	id_localism = IF(pLocalism = 0, NULL, pLocalism)
            ,	id_conflict = IF(pConflict = 0, NULL, pConflict)
            ,	rating = IF(pRating = 0, NULL, pRating)
            ,	srv_shower = pShower
            ,	srv_parking = pParking
            ,	srv_hostelry = pHostelry
            ,	srv_life_guard = pLifeGuard
            ,	srv_wc = pWc
            ,	srv_wifi = pWifi
            ,	bodyboard = pBodyboard
            ,	van = pVan
            ,	active = pActive
            ,	idForecast = IF(pForecast = 0, NULL, pForecast)
            
            WHERE
				id = pIdSpot
			;

			DELETE FROM naonda.spot_rel_bottom WHERE id_spot = pIdSpot;

			DELETE FROM naonda.spot_rel_location WHERE id_spot = pIdSpot;

			DELETE FROM naonda.spot_rel_swell_direction WHERE id_spot = pIdSpot;
            
            DELETE FROM naonda.spot_rel_tide WHERE id_spot = pIdSpot;

			DELETE FROM naonda.spot_rel_time WHERE id_spot = pIdSpot;
            
            DELETE FROM naonda.spot_rel_wave_description WHERE id_spot = pIdSpot;

			DELETE FROM naonda.spot_rel_wave_direction WHERE id_spot = pIdSpot;
            
            DELETE FROM naonda.spot_rel_wave_height WHERE id_spot = pIdSpot;

			DELETE FROM naonda.spot_rel_wind WHERE id_spot = pIdSpot;

			SET _id = pIdSpot;
		
		ELSE
		
			INSERT INTO naonda.spot (
				name
			,	id_region
			,	id_water
			,	latitude
			,	longitude
			,	id_wave_length
			,	id_swell_strength
			,	id_localism
			,	id_conflict
			,	rating
			,	srv_shower
			,	srv_parking
			,	srv_hostelry
			,	srv_life_guard
			,	srv_wc
			,	srv_wifi
			,	bodyboard
			,	van
			,	active
			,	idForecast)
			
			VALUES (
				IF(TRIM(pName) = '', NULL, pName)
			,	IF(pRegion = 0, NULL, pRegion)
			,	IF(pWater = 0, NULL, pWater)
			,	IF(pLatitude = 0, NULL, pLatitude)
			,	IF(pLongitude = 0, NULL, pLongitude)
			,	IF(pLength = 0, NULL, pLength)
			,	IF(pStrength = 0, NULL, pStrength)
			,	IF(pLocalism = 0, NULL, pLocalism)
			,	IF(pConflict = 0, NULL, pConflict)
			,	IF(pRating = 0, NULL, pRating)
			,	pShower
			,	pParking
			,	pHostelry
			,	pLifeGuard
			,	pWc
			,	pWifi
			,	pBodyboard
			,	pVan
			,	pActive
			,	IF(pForecast = 0, NULL, pForecast))
			;
			
			SET _id = (SELECT MAX(id) FROM naonda.spot);
		
		END IF;

		IF NOT(LENGTH(TRIM(pLocation)) = 0 OR pLocation IS NULL) THEN
			INSERT INTO naonda.spot_rel_location (id_spot, id_location) VALUES (_id, pLocation);
		END IF;

		iterator:
		LOOP
			IF LENGTH(TRIM(pBottom)) = 0 OR pBottom IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pBottom,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_bottom (id_spot, id_bottom) VALUES (_id, _value);
			SET pBottom = INSERT(pBottom, 1, _nextlen + 1, '');
		END LOOP;

		iterator:
		LOOP
			IF LENGTH(TRIM(pSwell)) = 0 OR pSwell IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pSwell,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_swell_direction (id_spot, id_direction) VALUES (_id, _value);
			SET pSwell = INSERT(pSwell, 1, _nextlen + 1, '');
		END LOOP;
		
		iterator:
		LOOP
			IF LENGTH(TRIM(pTide)) = 0 OR pTide IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pTide,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_tide (id_spot, id_tide) VALUES (_id, _value);
			SET pTide = INSERT(pTide, 1, _nextlen + 1, '');
		END LOOP;

		iterator:
		LOOP
			IF LENGTH(TRIM(pTime)) = 0 OR pTime IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pTime,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_time (id_spot, id_time) VALUES (_id, _value);
			SET pTime = INSERT(pTime, 1, _nextlen + 1, '');
		END LOOP;

		iterator:
		LOOP
			IF LENGTH(TRIM(pDescription)) = 0 OR pDescription IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pDescription,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_wave_description (id_spot, id_wave_description) VALUES (_id, _value);
			SET pDescription = INSERT(pDescription, 1, _nextlen + 1, '');
		END LOOP;
		
		iterator:
		LOOP
			IF LENGTH(TRIM(pWaveDirection)) = 0 OR pWaveDirection IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pWaveDirection,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_wave_direction (id_spot, id_wave_direction) VALUES (_id, _value);
			SET pWaveDirection = INSERT(pWaveDirection, 1, _nextlen + 1, '');
		END LOOP;

		iterator:
		LOOP
			IF LENGTH(TRIM(pHeight)) = 0 OR pHeight IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pHeight,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_wave_height (id_spot, id_wave) VALUES (_id, _value);
			SET pHeight = INSERT(pHeight, 1, _nextlen + 1, '');
		END LOOP;

		iterator:
		LOOP
			IF LENGTH(TRIM(pWind)) = 0 OR pWind IS NULL THEN
				LEAVE iterator;
			END IF;
			SET _next = SUBSTRING_INDEX(pWind,'#',1);
			SET _nextlen = LENGTH(_next);
			SET _value = TRIM(_next);
			INSERT INTO naonda.spot_rel_wind (id_spot, id_direction) VALUES (_id, _value);
			SET pWind = INSERT(pWind, 1, _nextlen + 1, '');
		END LOOP;
        
        SELECT "OK" AS result;
	
    ELSE
		
        SELECT "Indicar un nombre para el spot." AS result;
    
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `vst_spots_description`
--

/*!50001 DROP VIEW IF EXISTS `vst_spots_description`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vst_spots_description` AS select `s`.`idForecast` AS `idForecast`,`s`.`name` AS `name`,`r`.`region` AS `region`,`s`.`rating` AS `rating`,concat(group_concat(distinct `l`.`location` order by `l`.`id` ASC separator ', '),if((group_concat(distinct ifnull(`rl`.`description`,'') separator ', ') = ''),'',' - '),group_concat(distinct ifnull(`rl`.`description`,'') separator ', ')) AS `location`,`s`.`latitude` AS `latitude`,`s`.`longitude` AS `longitude`,group_concat(distinct `t`.`time` order by `t`.`id` ASC separator '-') AS `time`,group_concat(distinct `b`.`bottom` order by `b`.`id` ASC separator '-') AS `bottom`,group_concat(distinct `td`.`tide` order by `td`.`id` DESC separator '-') AS `tide`,`w`.`water` AS `water`,group_concat(distinct `wh`.`height` order by `wh`.`id` ASC separator ' a ') AS `height`,concat(group_concat(distinct ifnull(`wl`.`length`,'') separator ','),if((group_concat(distinct ifnull(`wl`.`length`,'') separator ',') = ''),'',' - '),group_concat(distinct `wd`.`direction` order by `wd`.`id` ASC separator ', '),if((group_concat(distinct ifnull(`wde`.`description`,'') separator ',') = ''),'',' - '),group_concat(distinct ifnull(`wde`.`description`,'') order by `wde`.`id` ASC separator ', '),if((group_concat(distinct ifnull(`rwde`.`description`,'') separator ',') = ''),'',' - '),group_concat(distinct ifnull(`rwde`.`description`,'') order by `wde`.`id` ASC separator ', ')) AS `wave`,group_concat(distinct `wdi`.`direction` order by `wdi`.`id` ASC separator ', ') AS `wind`,concat(`ss`.`strength`,' - ',group_concat(distinct `sd`.`direction` order by `sd`.`id` ASC separator ', ')) AS `swell`,concat(`lc`.`localism`,', ',`cn`.`conflict`) AS `localism`,`s`.`srv_shower` AS `shower`,`s`.`srv_parking` AS `parking`,`s`.`srv_hostelry` AS `hostelry`,`s`.`srv_life_guard` AS `life_guard`,`s`.`srv_wc` AS `wc`,`s`.`srv_wifi` AS `wifi`,`s`.`bodyboard` AS `bodyboard`,`s`.`van` AS `van` from ((((((((((((((((((((((((`spot` `s` left join `spot_region` `r` on((`s`.`id_region` = `r`.`id`))) left join `spot_rel_location` `rl` on((`s`.`id` = `rl`.`id_spot`))) left join `spot_location` `l` on((`rl`.`id_location` = `l`.`id`))) left join `spot_rel_time` `rt` on((`s`.`id` = `rt`.`id_spot`))) left join `spot_time` `t` on((`rt`.`id_time` = `t`.`id`))) left join `spot_rel_bottom` `rb` on((`s`.`id` = `rb`.`id_spot`))) left join `spot_bottom` `b` on((`rb`.`id_bottom` = `b`.`id`))) left join `spot_rel_tide` `rtd` on((`s`.`id` = `rtd`.`id_spot`))) left join `spot_tide` `td` on((`rtd`.`id_tide` = `td`.`id`))) left join `spot_water` `w` on((`s`.`id_water` = `w`.`id`))) left join `spot_rel_wave_height` `rwh` on((`s`.`id` = `rwh`.`id_spot`))) left join `spot_wave_height` `wh` on((`rwh`.`id_wave` = `wh`.`id`))) left join `spot_wave_length` `wl` on((`s`.`id_wave_length` = `wl`.`id`))) left join `spot_rel_wave_direction` `rwd` on((`s`.`id` = `rwd`.`id_spot`))) left join `spot_wave_direction` `wd` on((`rwd`.`id_wave_direction` = `wd`.`id`))) left join `spot_rel_wave_description` `rwde` on((`s`.`id` = `rwde`.`id_spot`))) left join `spot_wave_decription` `wde` on((`rwde`.`id_wave_description` = `wde`.`id`))) left join `spot_rel_wind` `rw` on((`s`.`id` = `rw`.`id_spot`))) left join `spot_direction` `wdi` on((`rw`.`id_direction` = `wdi`.`id`))) left join `spot_swell_strength` `ss` on((`s`.`id_swell_strength` = `ss`.`id`))) left join `spot_rel_swell_direction` `rsd` on((`s`.`id` = `rsd`.`id_spot`))) left join `spot_direction` `sd` on((`rsd`.`id_direction` = `sd`.`id`))) left join `spot_localism` `lc` on((`s`.`id_localism` = `lc`.`id`))) left join `spot_conflict` `cn` on((`s`.`id_conflict` = `cn`.`id`))) where (`s`.`active` = 1) group by `s`.`id` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vst_spots_edit_main`
--

/*!50001 DROP VIEW IF EXISTS `vst_spots_edit_main`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vst_spots_edit_main` AS select `s`.`id` AS `id`,`s`.`name` AS `name`,`s`.`id_region` AS `region`,`loc`.`id_location` AS `location`,`s`.`latitude` AS `latitude`,`s`.`longitude` AS `longitude`,`s`.`id_water` AS `water`,`s`.`id_wave_length` AS `wave_length`,`s`.`id_swell_strength` AS `swell_strength`,`s`.`id_localism` AS `localism`,`s`.`id_conflict` AS `conflict`,`s`.`rating` AS `rating`,`s`.`srv_shower` AS `shower`,`s`.`srv_parking` AS `parking`,`s`.`srv_hostelry` AS `hostelry`,`s`.`srv_life_guard` AS `life_guard`,`s`.`srv_wc` AS `wc`,`s`.`srv_wifi` AS `wifi`,`s`.`bodyboard` AS `bodyboard`,`s`.`van` AS `van`,`s`.`active` AS `active`,`s`.`idForecast` AS `forecast` from (`spot` `s` left join `spot_rel_location` `loc` on((`s`.`id` = `loc`.`id_spot`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vst_spots_main`
--

/*!50001 DROP VIEW IF EXISTS `vst_spots_main`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vst_spots_main` AS select `s`.`id` AS `id`,`s`.`name` AS `name`,`r`.`region` AS `region`,`s`.`latitude` AS `latitude`,`s`.`longitude` AS `longitude`,`s`.`rating` AS `rating` from (`spot` `s` join `spot_region` `r` on((`s`.`id_region` = `r`.`id`))) order by `s`.`name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-14 21:07:19
