CREATE DATABASE QaRds_db;

USE QaRds_db;

CREATE TABLE users (
	id int(11) auto_increment not null primary key,
	unique_id varchar(255) unique not null,
  userName varchar(255) not null,
  hashCode varchar(255) not null
);


CREATE TABLE user_profiles (
	id Int( 11 ) AUTO_INCREMENT NOT NULL primary key,
	unique_id VARCHAR (255) NOT NULL,
	first_name VARCHAR( 255 ) NOT NULL,
  last_name VARCHAR( 255 ) NOT NULL,
  email VARCHAR( 255 ) NOT NULL,
  phone VARCHAR( 255 ) NOT NULL,
	role VARCHAR( 255 ),
  company VARCHAR( 255 ),
  linkedin VARCHAR( 255 ),
  portfolio VARCHAR( 255 ),
  instagram VARCHAR( 255 ),
  cardStyle VARCHAR( 255 ),
  FOREIGN KEY (unique_id) 
  REFERENCES users(unique_id)
);