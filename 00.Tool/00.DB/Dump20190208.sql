-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: learnlangs
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendance` (
  `ATTENDANCE_SN` int(11) NOT NULL AUTO_INCREMENT,
  `STUDENT_SN` int(11) NOT NULL,
  `ATTENDANCE_DATE` varchar(8) NOT NULL,
  `ATTENDANCE_DATE_IN` varchar(14) DEFAULT NULL,
  `ATTENDANCE_DATE_OUT` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`ATTENDANCE_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `class` (
  `CLASS_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '분류 반 SN',
  `CLASS_NAME` varchar(100) NOT NULL COMMENT '분류 반 이름',
  `CLASS_TYPE_CODE` varchar(100) DEFAULT NULL COMMENT '분류 반 유형 코드',
  `CLASS_USEYN` tinyint(4) NOT NULL COMMENT '분류 반 사용여부',
  `CLASS_PAY` double NOT NULL,
  `CLASS_REGISTERDT` varchar(14) NOT NULL COMMENT '분류 반 등록일시',
  `CLASS_DESC` varchar(4000) DEFAULT NULL COMMENT '분류 반 메모',
  PRIMARY KEY (`CLASS_SN`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='분류 반';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1,'영어통합반','001',0,2000,'20180707005009',''),(2,'집중 단어반','001',0,20000,'20180704233944','');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_001`
--

DROP TABLE IF EXISTS `code_001`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_001` (
  `CODE_001` varchar(100) NOT NULL,
  `CODE_NAME` varchar(100) NOT NULL,
  `CODE_TYPE` varchar(10) DEFAULT NULL,
  `CODE_SORT` int(11) DEFAULT NULL,
  `CODE_USEYN` tinyint(4) NOT NULL,
  `CODE_UPDATE_SN` int(11) DEFAULT NULL,
  `CODE_UPDATE_DATE` varchar(14) DEFAULT NULL,
  `CODE_DESC` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`CODE_001`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_001`
--

LOCK TABLES `code_001` WRITE;
/*!40000 ALTER TABLE `code_001` DISABLE KEYS */;
INSERT INTO `code_001` VALUES ('001','강사유형',NULL,0,0,1,'20180628000000',NULL),('002','분류반유형',NULL,0,0,1,'20180628000000',NULL),('003','단어배치항목',NULL,0,0,1,'20180628000000',NULL),('004','상담유형',NULL,0,0,1,'20180628000000',NULL),('005','상담형태',NULL,0,0,1,'20180628000000',NULL),('006','넘버',NULL,0,0,1,'20180628000000',NULL),('007','요일',NULL,0,0,1,'20180628000000',NULL);
/*!40000 ALTER TABLE `code_001` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_002`
--

DROP TABLE IF EXISTS `code_002`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_002` (
  `CODE_002` varchar(100) NOT NULL,
  `CODE_001` varchar(100) NOT NULL,
  `CODE_NAME` varchar(100) NOT NULL,
  `CODE_TYPE` varchar(10) DEFAULT NULL,
  `CODE_SORT` int(11) DEFAULT NULL,
  `CODE_USEYN` tinyint(4) NOT NULL,
  `CODE_UPDATE_SN` int(11) DEFAULT NULL,
  `CODE_UPDATE_DATE` varchar(14) DEFAULT NULL,
  `CODE_DESC` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`CODE_002`,`CODE_001`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_002`
--

LOCK TABLES `code_002` WRITE;
/*!40000 ALTER TABLE `code_002` DISABLE KEYS */;
INSERT INTO `code_002` VALUES ('0','007','월요일',NULL,0,0,1,'20180628000000',NULL),('001','003','단어',NULL,0,0,1,'20180628000000',NULL),('001','004','인성',NULL,0,0,1,'20180628000000',NULL),('001','005','방문상담',NULL,0,0,1,'20180628000000',NULL),('002','003','단어 스펠링',NULL,0,0,1,'20180628000000',NULL),('002','004','발표력',NULL,0,0,1,'20180628000000',NULL),('002','005','기타',NULL,0,0,1,'20180628000000',NULL),('003','003','단어 뜻',NULL,0,0,1,'20180628000000',NULL),('003','004','면접',NULL,0,0,1,'20180628000000',NULL),('004','003','단어 예문',NULL,0,0,1,'20180628000000',NULL),('004','004','기타',NULL,0,0,1,'20180628000000',NULL),('005','004','취업',NULL,0,0,1,'20180628000000',NULL),('1','006','one.mp3',NULL,0,0,1,'20180628000000',NULL),('1','007','화요일',NULL,0,0,1,'20180628000000',NULL),('10','006','Ten.mp3',NULL,0,0,1,'20180628000000',NULL),('11','006','eleven.mp3',NULL,0,0,1,'20180628000000',NULL),('12','006','twelve.mp3',NULL,0,0,1,'20180628000000',NULL),('13','006','thirteen.mp3',NULL,0,0,1,'20180628000000',NULL),('14','006','fourteen.mp3',NULL,0,0,1,'20180628000000',NULL),('15','006','fifteen.mp3',NULL,0,0,1,'20180628000000',NULL),('16','006','sixteen.mp3',NULL,0,0,1,'20180628000000',NULL),('17','006','Seventeen.mp3',NULL,0,0,1,'20180628000000',NULL),('18','006','eighteen.mp3',NULL,0,0,1,'20180628000000',NULL),('2','006','two.mp3',NULL,0,0,1,'20180628000000',NULL),('2','007','수요일',NULL,0,0,1,'20180628000000',NULL),('3','006','Three.mp3',NULL,0,0,1,'20180628000000',NULL),('3','007','목요일',NULL,0,0,1,'20180628000000',NULL),('4','006','four.mp3',NULL,0,0,1,'20180628000000',NULL),('4','007','금요일',NULL,0,0,1,'20180628000000',NULL),('5','006','five.mp3',NULL,0,0,1,'20180628000000',NULL),('6','006','six.mp3',NULL,0,0,1,'20180628000000',NULL),('7','006','seven.mp3',NULL,0,0,1,'20180628000000',NULL),('8','006','eight.mp3',NULL,0,0,1,'20180628000000',NULL),('9','006','nine.mp3',NULL,0,0,1,'20180628000000',NULL);
/*!40000 ALTER TABLE `code_002` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_003`
--

DROP TABLE IF EXISTS `code_003`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `code_003` (
  `CODE_003` varchar(100) NOT NULL,
  `CODE_001` varchar(100) NOT NULL,
  `CODE_002` varchar(100) NOT NULL,
  `CODE_NAME` varchar(100) NOT NULL,
  `CODE_TYPE` varchar(100) DEFAULT NULL,
  `CODE_SORT` int(11) DEFAULT NULL,
  `CODE_USEYN` tinyint(4) NOT NULL,
  `CODE_UPDATE_SN` int(11) DEFAULT NULL,
  `CODE_UPDATE_DATE` varchar(14) DEFAULT NULL,
  `CODE_DESC` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`CODE_003`,`CODE_001`,`CODE_002`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_003`
--

LOCK TABLES `code_003` WRITE;
/*!40000 ALTER TABLE `code_003` DISABLE KEYS */;
/*!40000 ALTER TABLE `code_003` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consult`
--

DROP TABLE IF EXISTS `consult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consult` (
  `CONSULT_SN` int(11) NOT NULL AUTO_INCREMENT,
  `STUDENT_SN` int(11) NOT NULL,
  `TEACHER_SN` varchar(100) NOT NULL,
  `CONSULT_TYPE_CODE` varchar(100) DEFAULT NULL,
  `CONSULT_CLASS_TYPE` varchar(100) DEFAULT NULL,
  `CONSULT_DESC` varchar(4000) DEFAULT NULL,
  `CONSULT_DESC_DONE` varchar(4000) DEFAULT NULL,
  `CONSULT_REGISTERDT` varchar(14) NOT NULL,
  `CONSULT_NEXTDT` varchar(14) DEFAULT NULL,
  ` CONSULT_PUBLICYN` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`CONSULT_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consult`
--

LOCK TABLES `consult` WRITE;
/*!40000 ALTER TABLE `consult` DISABLE KEYS */;
/*!40000 ALTER TABLE `consult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrolment`
--

DROP TABLE IF EXISTS `enrolment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `enrolment` (
  `ENROLMENT_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '수강신청 일련번호',
  `STUDENT_SN` int(11) NOT NULL COMMENT '분류반 일련번호',
  `CLASS_SN` int(11) NOT NULL,
  `ENROLMENT_PAY_TYPE_CODE` varchar(100) DEFAULT NULL COMMENT '납부 유형',
  `ENROLMENT_PAY_PERIOD` int(11) DEFAULT NULL COMMENT '납부 기간 (월, 주)',
  `ENROLMENT_PAY_DT` varchar(14) NOT NULL COMMENT '청구일',
  `ENROLMENT_DESC` varchar(4000) DEFAULT NULL COMMENT '메모',
  `ENROLMENT_DIS_TYPE` varchar(100) DEFAULT NULL COMMENT '할인 유형',
  `ENROLMENT_DIS_PAY` double DEFAULT NULL COMMENT '할인 금액',
  `ENROLMENT_PAY` double DEFAULT NULL COMMENT '수강 금액',
  PRIMARY KEY (`ENROLMENT_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='수강신청';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrolment`
--

LOCK TABLES `enrolment` WRITE;
/*!40000 ALTER TABLE `enrolment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrolment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice`
--

DROP TABLE IF EXISTS `notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notice` (
  `NOTICE_SN` int(11) NOT NULL AUTO_INCREMENT,
  `NOTICE_NAME` varchar(100) NOT NULL,
  `NOTICE_TYPE_CD` varchar(100) DEFAULT NULL,
  `NOTICE_DESC` varchar(4000) NOT NULL,
  `NOTICE_REGISTERDT` varchar(14) NOT NULL,
  `NOTICE_USEYN` tinyint(4) NOT NULL,
  `NOTICE_USEPERIOD` varchar(14) DEFAULT NULL,
  PRIMARY KEY (`NOTICE_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice`
--

LOCK TABLES `notice` WRITE;
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_in`
--

DROP TABLE IF EXISTS `pay_in`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pay_in` (
  `PAY_IN_SN` int(11) NOT NULL AUTO_INCREMENT,
  `PAY_IN_NAME` varchar(100) DEFAULT NULL,
  `PAY_IN_TYPE_CD` varchar(100) DEFAULT NULL,
  `PAY_IN_TARGET_SN` int(11) DEFAULT NULL,
  `PAY_IN_TARGET_TYPE_CD` varchar(100) DEFAULT NULL,
  `PAY_IN_ITEM_SN` int(11) DEFAULT NULL,
  `PAY_IN_ITEMS` varchar(4000) DEFAULT NULL,
  `PAY_IN_PAY` double NOT NULL,
  `PAY_IN_REGISTERDT` varchar(14) NOT NULL,
  `PAY_IN_DESC` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`PAY_IN_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='입금';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_in`
--

LOCK TABLES `pay_in` WRITE;
/*!40000 ALTER TABLE `pay_in` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_in` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student` (
  `STUDENT_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '학생 SN',
  `USER_SN` int(11) DEFAULT NULL,
  `CLASS_SN` int(11) DEFAULT NULL COMMENT '담당 분류반 SN',
  `TEACHER_SN` int(11) DEFAULT NULL COMMENT '담당 강사 SN',
  `STUDENT_NAME` varchar(100) NOT NULL COMMENT '학생 이름',
  `STUDENT_ID` varchar(100) DEFAULT NULL COMMENT '학생 아이디',
  `STUDENT_PW` varchar(100) DEFAULT NULL COMMENT '학생 비밀번호',
  `STUDENT_TYPE_CODE` varchar(100) NOT NULL COMMENT '학생 유형\n휴원생, 재원생, 퇴원생',
  `STUDENT_BIRTHDAY` varchar(14) DEFAULT NULL COMMENT '학생 생년월일',
  `STUDENT_EMAIL` varchar(100) DEFAULT NULL COMMENT '수강생 이메일',
  `STUDENT_SCHOOL` varchar(100) DEFAULT NULL COMMENT '학교',
  `STUDENT_CLASS_CODE` varchar(100) DEFAULT NULL COMMENT '학년 코드',
  `STUDENT_ADDRESS` varchar(1000) DEFAULT NULL COMMENT '주소',
  `STUDENT_LAT` float DEFAULT NULL COMMENT '위도',
  `STUDENT_LON` float DEFAULT NULL COMMENT '경도',
  `STUDENT_TELL` varchar(100) DEFAULT NULL COMMENT '학생 전화번호',
  `STUDENT_TELL_MOM` varchar(100) DEFAULT NULL COMMENT '엄마 전화번호',
  `STUDENT_TELL_DAD` varchar(100) DEFAULT NULL COMMENT '아빠 전화번호',
  `STUDENT_REGISTERDT` varchar(14) NOT NULL COMMENT '등록일시 (입학일)',
  `STUDENT_RESUMEDT` varchar(14) DEFAULT NULL COMMENT '휴학일',
  `STUDENT_STOPDT` varchar(14) DEFAULT NULL COMMENT '퇴원일',
  `STUDENT_DESC` varchar(4000) DEFAULT NULL COMMENT '메모',
  PRIMARY KEY (`STUDENT_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='학생';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `TEACHER_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '강사 SN',
  `TEACHER_NAME` varchar(100) NOT NULL COMMENT '강사 이름',
  `TEACHER_TYPE_CODE` varchar(100) NOT NULL COMMENT '강사 구분 코드',
  `TEACHER_ID` varchar(100) NOT NULL COMMENT '강사 ID',
  `TEACHER_PW` varchar(100) NOT NULL COMMENT '강사 비밀번호',
  `TEACHER_TELL` varchar(100) NOT NULL COMMENT '강사전화번호',
  `TEACHER_USEYN` tinyint(4) NOT NULL,
  `TEACHER_REGISTERDT` varchar(14) NOT NULL COMMENT '등록일시',
  `TEACHER_DESC` varchar(4000) DEFAULT NULL COMMENT '강사 메모',
  PRIMARY KEY (`TEACHER_SN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='강사	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word` (
  `WORD_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '단어 SN',
  `WB_SN` int(11) NOT NULL COMMENT '연관 단어장 SN',
  `WORD_UNIT_SN` int(11) DEFAULT NULL,
  `WORD_WORD` varchar(100) NOT NULL COMMENT '단어',
  `WORD_MEAN` varchar(100) DEFAULT NULL COMMENT '의미, 뜻',
  `WORD_SPELLING` varchar(200) DEFAULT NULL,
  `WORD_SOUND` varchar(100) DEFAULT NULL COMMENT '발음 기호 문장',
  `WORD_SOUND_FILE` varchar(1000) DEFAULT NULL COMMENT '음성 파일 / 바이너리로 할지, Path로 할지 정하지 못함.',
  `WORD_EXAM` varchar(1000) DEFAULT NULL COMMENT '예문 지문',
  `WORD_EXAM_MEAN` varchar(1000) DEFAULT NULL COMMENT '예문 뜻',
  `WORD_LEVEL` varchar(100) DEFAULT NULL COMMENT '난이도',
  `WORD_IMPORTANT` varchar(100) DEFAULT NULL COMMENT '중요도',
  `WORD_LEARNYN` tinyint(4) NOT NULL COMMENT '암기여부',
  `WORD_IMAGE` varchar(1000) DEFAULT NULL COMMENT '이미지 정보 / 바이너리로 할지, PATH로 할 지 정하지 못함.',
  `WORD_LIKE` blob COMMENT '유의어, 비슷한 단어, 유사단어',
  `WORD_USEYN` tinyint(4) NOT NULL COMMENT '사용여부',
  PRIMARY KEY (`WORD_SN`)
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8 COMMENT='단어';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

LOCK TABLES `word` WRITE;
/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (267,1,0,'feeder','먹이통','','','','something that holds food for animals','동물을위한 음식을 저장하는 무언가','명사','1',1,'','',0),(268,1,0,'llama','라마','','','','an animal that has a long neck and thick fur','긴 목과 두꺼운 모피를 가진 동물','명사','2',1,'https://media.istockphoto.com/photos/guanaco-picture-id547022072?k=6&m=547022072&s=612x612&w=0&h=oSXL3wrGGg_Wm8N46xTy1VgcXjRoDYTGSuYP9DAqH8c=','',0),(269,1,0,'frame','틀','','','','the outside of something, like a photo or a window','사진이나 창문과 같은 무언가의 바깥 쪽','명사','3',1,'https://media.istockphoto.com/photos/picture-frame-picture-id907860458?k=6&m=907860458&s=612x612&w=0&h=Qg2VC8t5eCHDPUMUMjDpTZ8gfXd_cXkWRC-aH4Vvk64=','',0),(270,1,0,'He gave it food.','그는 그것에게 음식을 주었습니다.','','','','','','문장','4',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-qmLHASmVNBc91vEHo730n0mfxlaMU8l2upJPsN0xtUw3ENi3a5lul4f','',0),(271,1,1,'weathering','풍화','','','','water can change the shape and size pf the rock','물은 바위의 모양과 크기를 바꿀 수있다.','명사','1',1,'https://media.istockphoto.com/photos/rusty-metal-wall-background-picture-id628193318?k=6&m=628193318&s=612x612&w=0&h=0lFoX-RSHVF89Ui-ihKxEZ1vQux1-_lTr4EgRwssKQ8=','',0),(272,1,1,'dune','모래언덕','','','','sand hill','모래 언덕','명사','2',1,'https://media.istockphoto.com/photos/great-sand-sea-libyan-desert-africa-picture-id171280194?k=6&m=171280194&s=612x612&w=0&h=3KmlhJEdA4JnEUG8LhpxOhonIw838jUCCnPXgkQSPjM=','',0),(273,1,1,'mountain','산','','','','the highest type of land','가장 높은 유형의 땅','명사','3',1,'https://media.istockphoto.com/photos/rocky-mountain-peak-picture-id904856396?k=6&m=904856396&s=612x612&w=0&h=ZVZpbtWCmkHLN6cGpRtGdBIhwZZsMwXn5xSL3ThqslU=','',0),(274,1,1,'A small rocks and dead plants and animals go into the soil.','작은 바위와 죽은 식물과 동물이 흙으로 들어갑니다.','','','','','','문장','4',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPc21rdEyUB5_8s7EOjQ44V1VOSljdGQc5FRHT39gtuGUSka_USmExChkv','',0),(275,1,2,'dancing','춤을 추는','','','','He is dancing.','그는 춤을 추고있다.','형용사','1',1,'https://thumbs.gfycat.com/AgreeableAgreeableInchworm-max-1mb.gif','',0),(276,1,2,'eating','먹는','','','','They are eating pizza.','그들은 피자를 먹고 있습니다.','형용사','2',1,'https://thumbs.gfycat.com/CheerfulThoseCanadagoose-max-1mb.gif','',0),(277,1,2,'playing','노는','','','','She is playing with a ball.','그녀는 공을 가지고 노는 중입니다.','형용사','3',1,'https://media.istockphoto.com/photos/always-care-on-eachother-picture-id931423200?k=6&m=931423200&s=612x612&w=0&h=3QLC0kab30f7KbGwxO8LJSNLyEsMG2nRf9rkyG0XnK4=','',0),(278,1,2,'Is he selling a balloon?','그는 풍선을 차는 중입니까?','','','','','','문장','4',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLKVoDztyQ6Xf9QB91-Kt54NBiwIL4j26UKreyQJvbUR-WRc2m7yyAorX0','',0),(279,1,3,'useful','유용한, 쓰임이 많은','','','','helpful','도움이되는','형용사','1',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZX8FW0Voa03sVFCsduLUz1vTaAPgmSMyehNe_jjRsYOPyl4dVDEEge1hP','',0),(280,1,3,'product','물건','','','','something that is made to be used','사용하게 된 것','명사','2',1,'https://media.istockphoto.com/photos/paper-boxes-in-a-shopping-cart-picture-id675645602?k=6&m=675645602&s=612x612&w=0&h=c7KfGZ7fuRlSW1oRq1MhrLtFBezRgPzz1yIRz43gk6k=','',0),(281,1,3,'believe','믿다','','','','to think something is true','뭔가가 사실이라고 생각하는 것','동사','3',1,'https://media.istockphoto.com/photos/be-of-those-who-lend-a-hand-where-they-can-picture-id894377512?k=6&m=894377512&s=612x612&w=0&h=iHhtSDZzE4lXlC4fTTCCwJTf-XMFniD4A_BBpe7vZnk=','',0),(282,1,3,'You are a pretty smart llama.','너는 꽤 똑똑한 라마야.','','','',' ','&#160;','문장','4',1,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCNgy9eHm4Og7CN-pzK5k-cwBNWIE4QypFD7XzFu_A136I44xtM86VINKt','',0);
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_aud_loc`
--

DROP TABLE IF EXISTS `word_aud_loc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word_aud_loc` (
  `WAL_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '오디오 배치 일련번호\n',
  `WAL_NAME` varchar(45) NOT NULL COMMENT '오디오 배치 명',
  `WAL_LOCS` blob COMMENT '오디오 배치 순서',
  `WAL_UPDATE_DT` varchar(14) NOT NULL COMMENT '수정일시\n',
  `WAL_USEYN` tinyint(4) NOT NULL COMMENT '사용여부',
  `WAL_DESC` varchar(4000) DEFAULT NULL COMMENT '메모',
  PRIMARY KEY (`WAL_SN`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='단어 오디오 배치';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_aud_loc`
--

LOCK TABLES `word_aud_loc` WRITE;
/*!40000 ALTER TABLE `word_aud_loc` DISABLE KEYS */;
INSERT INTO `word_aud_loc` VALUES (5,'단어/단어스펠링/예문 많이','[{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":0,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":1,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":2,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"003\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 뜻\",\"CODE_TYPE\":null,\"CODE_SORT\":3,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":4,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":5,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":6,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":7,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":8,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":9,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":10,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":11,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":12,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":13,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":14,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":15,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":16,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":17,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":18,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":19,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":20,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"002\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 스펠링\",\"CODE_TYPE\":null,\"CODE_SORT\":21,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"004\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 예문\",\"CODE_TYPE\":null,\"CODE_SORT\":22,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null},{\"CODE\":\"003\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어 뜻\",\"CODE_TYPE\":null,\"CODE_SORT\":23,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null}]','20180712224528',0,''),(6,'단어만','[{\"CODE\":\"001\",\"CODE_001\":null,\"CODE_002\":null,\"CODE_003\":null,\"CODE_NAME\":\"단어\",\"CODE_TYPE\":null,\"CODE_SORT\":2,\"CODE_USEYN\":false,\"CODE_UPDATE_SN\":0,\"CODE_UPDATE_DATE\":null,\"CODE_DESC\":null}]','20180712225317',0,'');
/*!40000 ALTER TABLE `word_aud_loc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `word_book`
--

DROP TABLE IF EXISTS `word_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `word_book` (
  `WB_SN` int(11) NOT NULL AUTO_INCREMENT COMMENT '단어장 SN',
  `WB_NAME` varchar(100) NOT NULL COMMENT '단어장 명',
  `WB_CNT_UNIT` int(11) NOT NULL COMMENT '총 유닛 개수\n\n유닛이란??\n\n각 단어별로 자른다.\n\n예) 1 유닛 당 2단어, 총 2개 유닛, 총 4단어\n1. apple, hand\n2. foot, banana\n\n',
  `WB_CNT_WORD_UNIT` int(11) NOT NULL COMMENT '유닛 별 단어 개수',
  `WB_CNT_WORD` int(11) NOT NULL COMMENT '총 단어 개수',
  `WAL_SN` int(11) NOT NULL,
  `WB_LOOPCNT` int(11) NOT NULL,
  `WB_INTERVAL` int(11) NOT NULL,
  `WB_REGISTERDT` varchar(14) NOT NULL COMMENT '등록일시',
  `WB_USEYN` tinyint(4) NOT NULL COMMENT '사용여부',
  `WB_DESC` varchar(4000) DEFAULT NULL COMMENT '메모',
  PRIMARY KEY (`WB_SN`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='단어장';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word_book`
--

LOCK TABLES `word_book` WRITE;
/*!40000 ALTER TABLE `word_book` DISABLE KEYS */;
INSERT INTO `word_book` VALUES (1,'1일차 단어장',5,4,75,5,1,400,'20180712224550',0,'1111214124124');
/*!40000 ALTER TABLE `word_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'learnlangs'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-02-08 18:17:36
