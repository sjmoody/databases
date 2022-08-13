CREATE DATABASE IF NOT EXISTS chat ;

USE chat;

-- CREATE TABLE messages (
--   /* Describe your table here.*/
-- );

DROP TABLE IF EXISTS `Messages`;

-- might need messages to not be in quotes
CREATE TABLE `Messages` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_ID` INTEGER NULL DEFAULT NULL,
  `roomname` VARCHAR(255) NULL DEFAULT NULL,
  `text` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

/* Create other tables and define schemas for them here! */
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- Table 'Rooms'
--
-- ---

DROP TABLE IF EXISTS `Rooms`;

-- CREATE TABLE `Rooms` (
--   `id` INTEGER NOT NULL AUTO_INCREMENT,
--   `Name` VARCHAR(255) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Messages` ADD FOREIGN KEY (user_ID) REFERENCES `Users` (`id`);
-- ALTER TABLE `Messages` ADD FOREIGN KEY (room_ID) REFERENCES `Rooms` (`id`);



/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- From Schema Builder:
-- -- ---
-- -- Globals
-- -- ---

-- -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- -- SET FOREIGN_KEY_CHECKS=0;

-- -- ---
-- -- Table 'Messages'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `Messages`;

-- CREATE TABLE `Messages` (
--   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   `user_ID` INTEGER NULL DEFAULT NULL,
--   `room_ID` INTEGER NULL DEFAULT NULL,
--   `text` VARCHAR(255) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- -- ---
-- -- Table 'Users'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `Users`;

-- CREATE TABLE `Users` (
--   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   `Name` VARCHAR(255) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- -- ---
-- -- Table 'Rooms'
-- --
-- -- ---

-- DROP TABLE IF EXISTS `Rooms`;

-- CREATE TABLE `Rooms` (
--   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
--   `Name` VARCHAR(255) NULL DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- );

-- -- ---
-- -- Foreign Keys
-- -- ---

-- ALTER TABLE `Messages` ADD FOREIGN KEY (user_ID) REFERENCES `Users` (`id`);
-- ALTER TABLE `Messages` ADD FOREIGN KEY (room_ID) REFERENCES `Rooms` (`id`);

-- -- ---
-- -- Table Properties
-- -- ---

-- -- ALTER TABLE `Messages` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- -- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- -- ALTER TABLE `Rooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- -- ---
-- -- Test Data
-- -- ---

-- -- INSERT INTO `Messages` (`id`,`user_ID`,`room_ID`,`text`) VALUES
-- -- ('','','','');
-- -- INSERT INTO `Users` (`id`,`Name`) VALUES
-- -- ('','');
-- -- INSERT INTO `Rooms` (`id`,`Name`) VALUES
-- -- ('','');