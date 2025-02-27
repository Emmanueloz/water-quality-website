-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 172.24.0.2    Database: dwp3_db
-- ------------------------------------------------------
-- Server version	11.2.2-MariaDB-1:11.2.2+maria~ubu2204

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
-- Table structure for table `Rol`
--

DROP TABLE IF EXISTS `Rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Rol` (`Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rol`
--

LOCK TABLES `Rol` WRITE;
/*!40000 ALTER TABLE `Rol` DISABLE KEYS */;
INSERT INTO `Rol` VALUES (1,'Admin'),(2,'usuario');
/*!40000 ALTER TABLE `Rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(100) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Roles` int(11) NOT NULL,
  `id_privilegio` int(11) DEFAULT NULL,
  `Email` varchar(200) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Rol` (`Roles`),
  KEY `Usuarios_privilegios_FK` (`id_privilegio`),
  CONSTRAINT `Usuarios_ibfk_1` FOREIGN KEY (`Roles`) REFERENCES `Rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Usuarios_privilegios_FK` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (5,'admin','$2a$10$OWj2XxfcXDdkZ63Ye7VLCOWgaVzAQBlg0BGxyCH2Fg.hRE896DF1C',1,NULL,NULL,NULL),(6,'david','$2a$10$scDJArNHEA9hPv876edqeOEpYdn.49/QpmLUfV0p5AbIVrCXEAkne',2,3,NULL,NULL),(7,'angel','$2a$10$y.PzQ3ElehBGRVku8iAUAO2gTYUw5zkcmCE8/XBl0BrU3Wv1X.VG.',2,6,'fredev08@gmail.com','9673024705'),(8,'Daniel','$2a$10$LmBO.X6LY6aBVsvPXVIZQ.7W1r4MyLI6hznscKU2g5IzmUnOqMEFy',2,1,NULL,NULL);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `games_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (2,'Fifa 25','Un juego de futbol que es no ha cambiado y ahora es una casino','Deportes',5),(3,'fgfdgfdg','dsfsdfsdfsdf','Acción',5),(4,'mnzm,c xnz,mcn','sdzxczxc,m nm,nmn','Battle Royale',5),(5,'Halo infinite v2','Juego algo bueno','Battle Royale',7),(6,'Free fire','un juego de .','Battle Royale',7),(7,'COT','Una absoluta p','Battle Royale',7),(8,'Fornite','Juego para amantes de','Battle Royale',7),(9,'COD','KAKAKKAKAKAKAK','Battle Royale',7),(10,'ejemplo2','kfkkfksfs;kmbs ;sdmv;fdmb;d','Estrategia',7),(11,'ejemplo2','jjfdnkjdnvnsllfljfjdfljdfljdfljdfj,xcxcnvcnmvcnmmn','Aventura',7),(12,'ejemplo3','kldldflkfdkldfkldfllkffdlfdllfd','Deportes',7);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `maestro` varchar(100) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `materias_Usuarios_FK` (`id_usuario`),
  CONSTRAINT `materias_Usuarios_FK` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (39,'Seguridad en APPs','Donaciano',5),(40,'Administracion de BDs','Alejandro',7),(41,'Desarrollo web con NestJS','Hector',7),(42,'DevOps','H. Leon',7),(43,'desarrollo backend','Dalto',7),(44,'Seguridad en APPs','Andres',7),(45,'Ingles VII','Tania',7),(46,'Matematicas 2','Abdias',7),(47,'planeacion y organizacion del trabajo','Claudia',7);
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
INSERT INTO `modulos` VALUES (1,'materias'),(2,'games'),(3,'proyectos');
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset`
--

DROP TABLE IF EXISTS `password_reset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` text NOT NULL,
  `expires_at` timestamp NOT NULL,
  `type` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`) USING HASH,
  KEY `user_id` (`user_id`),
  CONSTRAINT `password_reset_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset`
--

LOCK TABLES `password_reset` WRITE;
/*!40000 ALTER TABLE `password_reset` DISABLE KEYS */;
INSERT INTO `password_reset` VALUES (1,7,'$2a$10$AXn.u9qJwUhH0DhzxHtXeuOqNjZJsaz.0/oOMpgbrde/JHYg8dzVO','2025-02-22 13:49:39','email');
/*!40000 ALTER TABLE `password_reset` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `priv_mod`
--

DROP TABLE IF EXISTS `priv_mod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `priv_mod` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_privilegio` int(11) NOT NULL,
  `id_module` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_privilegio` (`id_privilegio`),
  KEY `id_module` (`id_module`),
  CONSTRAINT `priv_mod_ibfk_1` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `priv_mod_ibfk_2` FOREIGN KEY (`id_module`) REFERENCES `modulos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `priv_mod`
--

LOCK TABLES `priv_mod` WRITE;
/*!40000 ALTER TABLE `priv_mod` DISABLE KEYS */;
INSERT INTO `priv_mod` VALUES (1,1,1),(2,2,2),(3,3,3),(4,4,1),(5,4,3),(6,5,2),(7,5,3),(13,6,1),(14,6,3),(15,6,2),(16,7,1),(17,7,2);
/*!40000 ALTER TABLE `priv_mod` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilegios`
--

DROP TABLE IF EXISTS `privilegios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilegios`
--

LOCK TABLES `privilegios` WRITE;
/*!40000 ALTER TABLE `privilegios` DISABLE KEYS */;
INSERT INTO `privilegios` VALUES (1,'materia'),(2,'juegos'),(3,'proyectos'),(4,'Escuela'),(5,'Diversion Y trabajo'),(6,'Todos'),(7,'medio');
/*!40000 ALTER TABLE `privilegios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(50) NOT NULL,
  `status` varchar(20) NOT NULL,
  `technologies` varchar(200) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (4,'BibliOco','proyecto para una biblioteca','Fullstack','Pausado','Python, JQuery, Js, Flask, MySQL',5),(6,'something else','sosoldfjdnvnvnd','UI/UX','En Desarrollo','another things',7),(7,'Fx Framework','Fixture de pruebas','Fullstack','Completado','React + TS, MaterialUI',7),(8,'BibliOco','integradora','Fullstack','Completado','Flask',7),(9,'VideoSlim','copresor de videos','Tools & Automation','Completado','Golang',7),(10,'CP-vision','reconocimiento facial','Backend','En Desarrollo','Python, openCV',7),(11,'ejemplo','algo de design','UI/UX','Pausado','Figma',7),(12,'Ejemplo2','modelo de regresion lineal','Machine Learning','Completado','skit-learn, Pytorch',7),(13,'ejemplo3','gdfjjjmmmm','Fullstack','Pausado','Redis, Golang, Docker, kafka',7),(14,'Ejemplo4','analis de datos de  una tienda en linea','Big Data','Pausado','Python',7),(15,'ejemplo4','alallfvmfkkmvmdlld','UI/UX','Completado','Figma',7),(16,'ejemplo5','kdkdlslslkdkdkdkdkdkfjg','DevOps','Pausado','ldldldldldlldldld',7),(17,'ejemplo6',',,cmfklldfkmlfkbfklbflnfblkfblkdfbfd','Big Data','Pausado','kkfkfkfkfkfkfkfkf',7),(18,'ejemplo7','klvvmsdlvknslkvnlkbgdkkadsfgkkowedl','Cybersecurity','En Desarrollo','dklfdlklfdklfdklfdlkfdkllklkfddklfdlkdf',7),(19,'Ejemplo8','klfdkfdkfbnbnkfnbkgnbdkmdpoflg','Frontend','Completado','klfblf dlkflkdlkfkllfkkffkfd',7),(20,'Ejemplo9','ldflflkkldfkldfkldflkfdlkdflkfklfdkfdkdffdl','Frontend','Completado','kfkfkkfkfkdllkfd',7),(21,'Ejemplo10','gdjbejptngkfdkdfnsnvn fkvnpnfvr','UI/UX','En Desarrollo','jkdfknbdnlkfnldiprtoowrkkvsnb',7);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidades`
--

DROP TABLE IF EXISTS `unidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unidades` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `horas_totales` decimal(5,2) NOT NULL,
  `id_materia` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `unidades_ibfk_1` (`id_materia`),
  CONSTRAINT `unidades_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidades`
--

LOCK TABLES `unidades` WRITE;
/*!40000 ALTER TABLE `unidades` DISABLE KEYS */;
INSERT INTO `unidades` VALUES (43,'Principios de codificación segura',3.00,39),(44,'BDs relacionales',35.00,40),(45,'clean architecture',45.00,41),(46,'terraform',15.00,42),(47,'Golang desde 0',20.00,43),(48,'Principios de codificación segura',45.00,44),(49,'Future',30.00,45),(50,'Series de Furier',30.00,46),(51,'Planeacion estrategica',10.00,47);
/*!40000 ALTER TABLE `unidades` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 14:07:05

-- dwp3_db.question_recover_user definition

CREATE TABLE `question_recover_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question_num` int(11) NOT NULL,
  `answer` varchar(100) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_recover_user_Usuarios_FK` (`id_user`),
  CONSTRAINT `question_recover_user_Usuarios_FK` FOREIGN KEY (`id_user`) REFERENCES `Usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;