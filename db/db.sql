create database game_project;
use game_project;

create table characters (
    character_id int AUTO_INCREMENT NOT NULL,
    char_name  varchar(255) NOT NULL,
    char_img varchar(255) NOT NULL,
    health_level int NOT NULL,
    attack_power int NOT NULL,
    PRIMARY KEY(character_id)
);
