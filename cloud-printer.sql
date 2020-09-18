/*
 Navicat Premium Data Transfer

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 50649
 Source Host           : localhost:3306
 Source Schema         : cloud-printer

 Target Server Type    : MySQL
 Target Server Version : 50649
 File Encoding         : 65001

 Date: 18/09/2020 19:19:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cp_checklist
-- ----------------------------
DROP TABLE IF EXISTS `cp_checklist`;
CREATE TABLE `cp_checklist` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `content` text,
  `print_num` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cp_checklist
-- ----------------------------
BEGIN;
INSERT INTO `cp_checklist` VALUES (1, 1, '<table class=\"table table-condensed\">\n            <thead>\n            <tr>\n                <th>Drug Name</th>\n                <th>Location</th>\n                <th>Quantity</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n                <td>Tanmay</td>\n                <td>HONG KONG 01</td>\n                <td>100</td>\n            </tr>\n            <tr>\n                <td>Sachin</td>\n                <td>HONG KONG 02</td>\n                <td>200</td>\n            </tr>\n            <tr>\n                <td>Uma</td>\n                <td>HONG KONG 02</td>\n                <td>300</td>\n            </tr>\n            </tbody>\n        </table>', 14);
INSERT INTO `cp_checklist` VALUES (2, 1, '<table class=\"table table-condensed\">\n            <thead>\n            <tr>\n                <th>Drug Name</th>\n                <th>Location</th>\n                <th>Quantity</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr>\n                <td>Name 111</td>\n                <td>Location 111</td>\n                <td>10</td>\n            </tr>\n            <tr>\n                <td>Name 2222</td>\n                <td>Location 22222</td>\n                <td>20</td>\n            </tr>\n            <tr>\n                <td>Name 3333</td>\n                <td>Location 3333</td>\n                <td>30</td>\n            </tr>\n            </tbody>\n        </table>', 4);
COMMIT;

-- ----------------------------
-- Table structure for cp_locations
-- ----------------------------
DROP TABLE IF EXISTS `cp_locations`;
CREATE TABLE `cp_locations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `printer_01` varchar(100) DEFAULT NULL,
  `printer_02` varchar(100) DEFAULT NULL,
  `printer_03` varchar(100) DEFAULT NULL,
  `printer_04` varchar(100) DEFAULT NULL,
  `printer_05` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cp_locations
-- ----------------------------
BEGIN;
INSERT INTO `cp_locations` VALUES (1, '湾仔店', 'Canon_TS9580_series', NULL, NULL, NULL, NULL);
INSERT INTO `cp_locations` VALUES (2, '旺角店', 'Canon_TS9580_series', NULL, NULL, NULL, NULL);
INSERT INTO `cp_locations` VALUES (3, '荃湾店', 'Canon_TS9580_series', NULL, NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for cp_print
-- ----------------------------
DROP TABLE IF EXISTS `cp_print`;
CREATE TABLE `cp_print` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `location_id` int(10) unsigned DEFAULT NULL,
  `checklist_id` int(10) unsigned DEFAULT NULL,
  `print_num` int(10) unsigned DEFAULT '0',
  `status` tinyint(3) unsigned DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `locationId_checklistId` (`location_id`,`checklist_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
