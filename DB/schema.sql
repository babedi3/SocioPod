DROP DATABASE IF EXISTS sociopds;

CREATE DATABASE sociopods;

USE sociopods;

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(45) NOT NULL,
password VARCHAR(45) NOT NULL,
interestOne VARCHAR(45) NOT NULL,
interestTwo VARCHAR(45) NOT NULL,
interestThree VARCHAR(45) NOT NULL,
PRIMARY KEY (id)
)