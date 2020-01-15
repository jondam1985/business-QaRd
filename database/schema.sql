CREATE DATABASE `QaRds_db`;
USE `QaRds_db`;
CREATE TABLE `users` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
    `unique_id` VARCHAR (255) NOT NULL,
    `username` VARCHAR (255) NOT NULL,
    `password` VARCHAR (255) NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `unique_id` )
);
CREATE TABLE `user_profile` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`unique_id` VARCHAR (255) NOT NULL,
	`first_name` VARCHAR( 255 ) NOT NULL,
    `last_name` VARCHAR( 255 ) NOT NULL,
    `email` VARCHAR( 255 ) NOT NULL,
    `phone` VARCHAR( 255 ) NOT NULL,
	`role` VARCHAR( 255 ),
    `company` VARCHAR( 255 ),
    `linkedin` VARCHAR( 255 ),
    `portfolio` VARCHAR( 255 ),
    `instagram` VARCHAR( 255 ),
	/* Set ID as primary key */
	PRIMARY KEY ( `id` )
    FOREIGN KEY (`unique_id`) REFERENCES users(`unique_id`)
);