CREATE DATABASE pokedex;
USE pokedex;

CREATE TABLE pokemon(
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    level integer,
    type VARCHAR(20),
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


