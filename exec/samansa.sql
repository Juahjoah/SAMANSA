-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: k9b207.p.ssafy.io    Database: meme
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `declaration`
--

DROP TABLE IF EXISTS `declaration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declaration` (
  `declaration_id` bigint NOT NULL AUTO_INCREMENT,
  `word_id` varchar(30) NOT NULL,
  `declaration_count` int NOT NULL DEFAULT '0',
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`declaration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declaration`
--

LOCK TABLES `declaration` WRITE;
/*!40000 ALTER TABLE `declaration` DISABLE KEYS */;
INSERT INTO `declaration` VALUES (1,'asdasdasdad',4,'2023-11-07 13:01:54','2023-11-07 13:01:54'),(2,'dd',2,'2023-11-07 13:11:41','2023-11-07 13:34:17'),(3,'Rw7Zo4sBy0zyIcemgjFs',1,'2023-11-07 14:53:54','2023-11-07 14:53:54'),(4,'Cg58n4sBy0zyIcemwTHd',1,'2023-11-07 14:58:18','2023-11-07 14:58:18'),(5,'YA7kqIsBy0zyIcemIzGJ',1,'2023-11-08 11:40:17','2023-11-08 11:40:17'),(6,'FA78iYsBy0zyIcemdDCk',1,'2023-11-09 14:24:37','2023-11-09 14:24:38'),(7,'Fw7-iYsBy0zyIcemzDAi',1,'2023-11-09 14:47:07','2023-11-09 14:47:07'),(8,'ag50sYsBy0zyIcemqTFL',1,'2023-11-09 17:27:24','2023-11-09 17:27:24'),(9,'aw7EsYsBy0zyIcem3jFP',2,'2023-11-09 17:27:52','2023-11-09 17:31:52'),(10,'Iw6UtosBy0zyIcem0zOR',1,'2023-11-10 10:24:59','2023-11-10 10:24:59'),(11,'xQ6UtosBy0zyIcemyzLJ',2,'2023-11-13 14:22:11','2023-11-14 13:40:30'),(12,'lw4xy4sBy0zyIcemJTNc',1,'2023-11-14 09:18:06','2023-11-14 09:18:06'),(13,'jQ6M0IsBy0zyIcemaEPB',1,'2023-11-15 10:41:32','2023-11-15 10:41:32'),(14,'0Q5X0YsBy0zyIcemaENF',1,'2023-11-15 16:33:29','2023-11-15 16:33:30'),(15,'ug6M0IsBy0zyIcemcEN9',1,'2023-11-15 16:42:45','2023-11-15 16:42:46');
/*!40000 ALTER TABLE `declaration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `declaration_log`
--

DROP TABLE IF EXISTS `declaration_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `declaration_log` (
  `declaration_log_id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` varchar(50) NOT NULL,
  `declaration_id` bigint NOT NULL,
  `create_date` datetime DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  PRIMARY KEY (`declaration_log_id`),
  KEY `fk_from_fk_from_member_to_declaration_to_declaration_log_idx` (`declaration_id`),
  CONSTRAINT `fk_from_declaration_to_declaration_log` FOREIGN KEY (`declaration_id`) REFERENCES `declaration` (`declaration_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `declaration_log`
--

LOCK TABLES `declaration_log` WRITE;
/*!40000 ALTER TABLE `declaration_log` DISABLE KEYS */;
INSERT INTO `declaration_log` VALUES (3,'3021774079',2,'2023-11-07 13:34:17','2023-11-07 13:34:17'),(5,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',3,'2023-11-07 14:53:54','2023-11-07 14:53:54'),(6,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',4,'2023-11-07 14:58:18','2023-11-07 14:58:18'),(7,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',5,'2023-11-08 11:40:17','2023-11-08 11:40:17'),(8,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',6,'2023-11-09 14:24:38','2023-11-09 14:24:38'),(9,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',7,'2023-11-09 14:47:07','2023-11-09 14:47:07'),(10,'3036431511',8,'2023-11-09 17:27:24','2023-11-09 17:27:24'),(11,'3037842085',9,'2023-11-09 17:27:52','2023-11-09 17:27:52'),(12,'3036431511',9,'2023-11-09 17:31:52','2023-11-09 17:31:52'),(13,'3149490510',10,'2023-11-10 10:24:59','2023-11-10 10:24:59'),(14,'nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4',11,'2023-11-13 14:22:11','2023-11-13 14:22:11'),(15,'3149490510',12,'2023-11-14 09:18:06','2023-11-14 09:18:06'),(16,'3149490510',11,'2023-11-14 13:40:30','2023-11-14 13:40:30'),(18,'3021774079',13,'2023-11-15 10:41:32','2023-11-15 10:41:32'),(19,'3058223076',14,'2023-11-15 16:33:30','2023-11-15 16:33:30'),(20,'QPAxGHNsDbbpUodaYqbBqxTS3bxvQp7ktYXF0xfeJek',15,'2023-11-15 16:42:46','2023-11-15 16:42:46');
/*!40000 ALTER TABLE `declaration_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag` (
  `hashtag_id` bigint NOT NULL AUTO_INCREMENT,
  `hashtag_name` varchar(30) NOT NULL,
  `create_date` datetime NOT NULL,
  PRIMARY KEY (`hashtag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES (4,'과일','2023-10-19 14:38:17'),(5,'사과','2023-10-19 14:38:19'),(6,'바나나','2023-10-30 12:38:17');
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag_link`
--

DROP TABLE IF EXISTS `hashtag_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag_link` (
  `hashtag_link_id` bigint NOT NULL AUTO_INCREMENT,
  `word_id` bigint NOT NULL,
  `hashtag_id` bigint NOT NULL,
  PRIMARY KEY (`hashtag_link_id`),
  KEY `FK_word_TO_hashtag_link_1` (`word_id`),
  KEY `FK_hashtag_TO_hashtag_link_1` (`hashtag_id`),
  CONSTRAINT `FK_hashtag_TO_hashtag_link_1` FOREIGN KEY (`hashtag_id`) REFERENCES `hashtag` (`hashtag_id`),
  CONSTRAINT `FK_word_TO_hashtag_link_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag_link`
--

LOCK TABLES `hashtag_link` WRITE;
/*!40000 ALTER TABLE `hashtag_link` DISABLE KEYS */;
INSERT INTO `hashtag_link` VALUES (7,6,4),(8,6,5),(9,8,4),(10,8,5),(11,8,6);
/*!40000 ALTER TABLE `hashtag_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `like_id` bigint NOT NULL AUTO_INCREMENT,
  `word_id` bigint NOT NULL,
  `like_count` bigint NOT NULL DEFAULT '0',
  `dislike_count` bigint NOT NULL DEFAULT '0',
  PRIMARY KEY (`like_id`),
  KEY `FK_word_TO_like_1` (`word_id`),
  CONSTRAINT `FK_word_TO_like_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (1,8,0,1),(2,6,0,2),(3,7,0,3);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like_log`
--

DROP TABLE IF EXISTS `like_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like_log` (
  `like_log_id` bigint NOT NULL AUTO_INCREMENT,
  `word_id` bigint NOT NULL,
  `user_ip` varchar(15) DEFAULT NULL,
  `like_status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`like_log_id`),
  KEY `FK_word_TO_like_log_1` (`word_id`),
  CONSTRAINT `FK_word_TO_like_log_1` FOREIGN KEY (`word_id`) REFERENCES `word` (`word_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like_log`
--

LOCK TABLES `like_log` WRITE;
/*!40000 ALTER TABLE `like_log` DISABLE KEYS */;
INSERT INTO `like_log` VALUES (1,6,'1.1.1.1',1),(2,6,'2.2.2.2',0);
/*!40000 ALTER TABLE `like_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_id` varchar(50) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `change_status` tinyint NOT NULL,
  `social_type` varchar(20) NOT NULL,
  `role_type` varchar(20) NOT NULL,
  `create_date` datetime NOT NULL,
  `update_date` datetime NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES ('15Dx7eaVA3Dn1WTfVZ8SRjVXddlrO49R7Kt5gutxzKI','나다','th1563@naver.com',1,'NAVER','USER','2023-11-02 15:05:01','2023-11-02 15:05:09','NO_PASS'),('3021774079','나무','harib0@kakao.com',1,'KAKAO','USER','2023-10-18 13:59:20','2023-10-26 14:02:17','NO_PASS'),('3036431511','땡초김밥','07juahlily21@naver.com',1,'KAKAO','USER','2023-10-25 12:28:33','2023-10-25 12:28:50','NO_PASS'),('3037842085','노노','pgy1613@naver.com',1,'KAKAO','USER','2023-11-02 09:04:25','2023-11-02 09:04:36','NO_PASS'),('3038115215','신재걸','acd0825@gmail.com',1,'KAKAO','USER','2023-11-15 13:54:10','2023-11-15 13:54:16','NO_PASS'),('3048421191','사만사사','pum005@naver.com',1,'KAKAO','USER','2023-11-02 17:45:06','2023-11-02 17:45:15','NO_PASS'),('3052354706','고니','qkrrlgus114@naver.com',1,'KAKAO','USER','2023-11-02 11:49:58','2023-11-02 11:50:09','NO_PASS'),('3052668345','잉어킹','jiu6525@daum.net',1,'KAKAO','USER','2023-11-03 17:10:24','2023-11-03 17:10:33','NO_PASS'),('3057613719','플로깅왕알킴','v3030v@nate.com',1,'KAKAO','USER','2023-11-15 13:53:42','2023-11-15 13:53:57','NO_PASS'),('3058204732','코딩킹','thdqudgns96@naver.com',1,'KAKAO','USER','2023-11-13 18:20:20','2023-11-13 18:21:05','NO_PASS'),('3058223076','하리보','w124564@naver.com',1,'KAKAO','USER','2023-11-15 16:30:03','2023-11-15 16:32:33','NO_PASS'),('3144207170','쿠크다스','sonman0409@gmail.com',1,'KAKAO','USER','2023-11-02 09:25:04','2023-11-02 09:25:23','NO_PASS'),('3144218853','썩던콩','jungmin0049@gmail.com',1,'KAKAO','USER','2023-11-02 09:33:59','2023-11-02 09:34:12','NO_PASS'),('3144255177','와니','dup07168@naver.com',1,'KAKAO','USER','2023-11-02 10:01:28','2023-11-02 10:03:19','NO_PASS'),('3144350088','구마','rkddnjs58@naver.com',1,'KAKAO','USER','2023-11-02 11:06:19','2023-11-02 11:06:30','NO_PASS'),('3144352598','코치코치','bljh1008@naver.com',1,'KAKAO','USER','2023-11-02 11:07:53','2023-11-02 11:08:03','NO_PASS'),('3144362465','ssafyman','syhfqq1810@naver.com',1,'KAKAO','USER','2023-11-02 11:14:07','2023-11-02 11:14:28','NO_PASS'),('3144374888','너바나','123xxx@kakao.com',1,'KAKAO','USER','2023-11-02 11:22:12','2023-11-02 11:22:44','NO_PASS'),('3144440267','흥민','tngud124@kakao.com',1,'KAKAO','USER','2023-11-02 12:06:24','2023-11-02 12:06:38','NO_PASS'),('3144449216','사자','godzz733@naver.com',1,'KAKAO','USER','2023-11-02 12:12:36','2023-11-02 12:18:33','NO_PASS'),('3144460991','7반','3246lyh@naver.com',1,'KAKAO','USER','2023-11-02 12:21:03','2023-11-02 12:21:21','NO_PASS'),('3144484756','세윤','yun12343@naver.com',1,'KAKAO','USER','2023-11-02 12:37:28','2023-11-02 12:37:38','NO_PASS'),('3144494624','youni','wldbs8241@naver.com',1,'KAKAO','USER','2023-11-02 12:44:08','2023-11-02 12:44:22','NO_PASS'),('3144566238','오뱅','eric_oh@naver.com',1,'KAKAO','USER','2023-11-02 13:31:51','2023-11-02 13:31:59','NO_PASS'),('3144583650','망고','tkwkalsrn@naver.com',1,'KAKAO','USER','2023-11-02 13:43:30','2023-11-02 13:43:40','NO_PASS'),('3145777688','수코양이2','asya390@gmail.com',1,'KAKAO','USER','2023-11-03 09:53:34','2023-11-03 09:53:53','NO_PASS'),('3146007410','gfsg','lrune2el@naver.com',1,'KAKAO','USER','2023-11-03 12:30:23','2023-11-03 12:30:30','NO_PASS'),('3149490510','순해','15gpfk@naver.com',1,'KAKAO','USER','2023-11-05 21:33:50','2023-11-05 21:34:55','NO_PASS'),('3163828418','반로섬','leednj0113@naver.com',1,'KAKAO','USER','2023-11-15 14:29:16','2023-11-15 14:29:23','NO_PASS'),('3163949089','링고타운','jiminsung@naver.com',1,'KAKAO','USER','2023-11-15 15:42:29','2023-11-15 15:44:37','NO_PASS'),('3165074310','쿠아','bsdpwlsbs25@nate.com',1,'KAKAO','USER','2023-11-16 11:02:57','2023-11-16 11:03:45','NO_PASS'),('7I3G9opYiJxrQXzpE-7aLXk7THjMGHNKlT_N9rv0Zpo','link****','link1702@naver.com',0,'NAVER','USER','2023-11-02 09:31:50','2023-11-02 09:31:50','NO_PASS'),('aJveAiiS-DdPF5A6REZJV774iCnhGiBeLxUJxeyA5M4','김제갈','asdskylee@gmail.com',1,'NAVER','USER','2023-11-02 12:39:38','2023-11-02 12:39:45','NO_PASS'),('Boj4At8_MT5VfKq5Wg9wBeKoDzi3rjKqy66bhGE9xIo','마3대몇','developerchiheonlee@naver.com',1,'NAVER','USER','2023-11-02 11:11:12','2023-11-02 11:11:54','NO_PASS'),('GnyMZkXSuugIRdhiJc9AI_nU_6AVBVQO48xYZBa3k0Y','뽀글뽀글','dup07168@naver.com',1,'NAVER','USER','2023-11-02 12:58:42','2023-11-02 12:58:58','NO_PASS'),('iojFrWrRI5UtgiwsSbmLZvvo1F0Hq4ozrNb3Mr5Xr8g','킹왕짱짱맨','acrow0330@naver.com',1,'NAVER','USER','2023-11-15 14:26:23','2023-11-15 14:26:33','NO_PASS'),('JT525RSoMku6xfrGb9DedJnhw1is-AcSBr_sUFevKkY','수코양이','asya390@gmail.com',1,'NAVER','USER','2023-11-02 12:26:35','2023-11-02 12:26:49','NO_PASS'),('LQxbpW4qrWU134WKCOuWJgXTHU1wFQQ3ecGVIjUj51Y','강지우','ajtwlswldn789@naver.com',0,'NAVER','USER','2023-11-03 17:16:08','2023-11-03 17:16:08','NO_PASS'),('mNj8CFYQLjqfAPu14JCC5O0OsDu26FUsen8264xs4Co','이상해요','bewithu14@naver.com',1,'NAVER','USER','2023-11-02 15:20:41','2023-11-02 15:20:49','NO_PASS'),('nLD30MtLYVfmu_tIbjmXcK-ZdWiI8YM1KWqDNmyfBj4','joung','15gpfk@naver.com',1,'NAVER','USER','2023-11-01 10:20:26','2023-11-01 10:20:43','NO_PASS'),('QPAxGHNsDbbpUodaYqbBqxTS3bxvQp7ktYXF0xfeJek','ㅈㅈ','godzz733@naver.com',1,'NAVER','USER','2023-11-15 16:41:03','2023-11-15 16:41:09','NO_PASS'),('SJdk_EgDRo39Vf2JZpqgyeKaRWQUf5ywoHOq0su4YhA','사만사만','bk007bak@hanmail.net',1,'NAVER','USER','2023-11-02 12:14:12','2023-11-02 12:14:25','NO_PASS'),('wjgxpPZTOqQEAEV-ZBD3LWVK4lVvxqMGs9x4unwBJDM','도도독','qkrguswns25@naver.com',1,'NAVER','USER','2023-10-25 17:26:57','2023-11-06 21:19:17','NO_PASS'),('xnNgzbl_n6yYStfna9KC2ASn6sXmIcxpmbtnZuDYFaU','ㅁㅇㅁㄴㅇㅁㅇㅁ','lanto12@naver.com',1,'NAVER','USER','2023-11-02 13:39:32','2023-11-02 13:39:38','NO_PASS'),('xwio91iocV2nHA3e7xXE_qlLJO_H9ulPom8IvyP7me8','안녕하세요!','07juahlily21@naver.com',1,'NAVER','USER','2023-11-02 10:00:34','2023-11-02 10:00:45','NO_PASS'),('zEFt2Zy3a1uVBlSZktUF9f3LLA1olgmjr6OgeSrPsAQ','알킴','ghg303@naver.com',1,'NAVER','USER','2023-11-02 10:31:52','2023-11-02 10:32:00','NO_PASS');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `word_id` bigint NOT NULL AUTO_INCREMENT,
  `word_name` varchar(100) NOT NULL,
  `word_description` text NOT NULL,
  `create_date` datetime NOT NULL,
  `member_id` varchar(50) NOT NULL,
  `word_example` text NOT NULL,
  PRIMARY KEY (`word_id`),
  KEY `FK_member_TO_word_1` (`member_id`),
  CONSTRAINT `FK_member_TO_word_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (6,'사과','빨간색 과일','2023-10-19 17:03:04','3021774079','사과 먹을래?'),(7,'사과바나나','빨간색 과일','2023-10-30 12:36:34','3021774079','사과 먹을래?'),(8,'사과바나나','빨간색 과일','2023-10-30 12:38:16','3021774079','사과 먹을래?');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-17  8:50:24
