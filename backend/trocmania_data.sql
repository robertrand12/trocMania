-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: trocmania
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `ad`
--

LOCK TABLES `ad` WRITE;
/*!40000 ALTER TABLE `ad` DISABLE KEYS */;
INSERT INTO `ad` VALUES (1,'téléviseur',500,'il est tout beau tout neuf','2023-07-19 14:44:37','neuf','multimédia',1,1),(2,'playstation 1',50,'console vintage','2023-07-19 14:47:51','bon état','multimédia',1,1),(3,'clio 1',200,'Voiture qui ne roule plus...','2023-07-19 14:48:47','pour pièces','véhicule',1,1),(4,'table basse',30,'Parfaite pour l\'apéritif','2023-07-19 14:49:41','état moyen','ameublement',1,1),(5,'four encastrable',250,'Comme neuf, jamais servi','2023-07-19 14:50:35','neuf','éléctroménager',1,1),(6,'appareil pour raper les carottes',5,'je n\'en peux plus de manger des carottes rapées tous les midis. Prix négociable','2023-07-19 14:57:21','très bon état','autre',3,1),(7,'maison 4 pièces 120m²',200000,'Vends maison 4 pièces avec ..............blablabla','2023-07-19 14:58:55','bon état','immobilier',3,1),(8,'renault Zoé',15000,'Je me suis trompé, c\'est une voiture éléctrique...','2023-07-19 15:00:34','neuf','véhicule',3,1),(9,'studio meublé',150000,'description du bien immobilier etc etc etc etc........','2023-07-19 15:01:59','bon état','immobilier',2,1),(10,'futon',45,'pour étudiant','2023-07-19 15:04:29','bon état','ameublement',2,1);
/*!40000 ALTER TABLE `ad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bertrand','Robert','bébert',NULL,'19, rue des écuyers',NULL,'chartres',28000,48.446278,1.490439,'brobert.bertrand@wanadoo.fr','$argon2id$v=19$m=65536,t=5,p=1$rf1a2E1OckIlw+gFNHSZGA$FeRcbBS69Yfo2Y/ZQyL70vDWinZ5WOCbkq83WbdmPMc','admin'),(2,'John','Doe','bogoss du 30',NULL,'10, rue de la pitié',NULL,'nimes',30900,43.834007,4.353947,'john.doe@example.fr','$argon2id$v=19$m=65536,t=5,p=1$l33UNICC/24+VFm8rkUlmQ$vSk0s2bWOM3vTAli0RXiIqNtm/tDKEUT92bDF6exuKc','user'),(3,'Xavier','Georget', 'Xgt72',NULL,'23, rue des glacières',NULL,'strasbourg',67000,48.577187,7.742667,'xavier.georget@example.fr','$argon2id$v=19$m=65536,t=5,p=1$T0srL6ry0wo8Bpc08gifUw$neIzeOfgLiTRZCcBGYNKj8ewJeHXAVz+W/tBQx9YHEU','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-19 15:07:37
