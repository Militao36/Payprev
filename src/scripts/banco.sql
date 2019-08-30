CREATE database payprev;
use payprev;

CREATE TABLE users(
    idUser int auto_increment primary key,
    email varchar(150) not null unique,
    senha varchar(200) not null,
    cpf varchar(15) not null unique,
    tipoUsuario enum('ADMIN','COMUM') default NULL
);

CREATE TABLE user_git(
    idUserGit int auto_increment primary key,
    login varchar(100) not null unique,
    name varchar(200) not null,
    bio varchar(200),
    location varchar(150),
    html_url varchar(200) not null
);


CREATE TABLE lista(
    idLista int auto_increment primary key,
    nameLista varchar(100) not null
);

CREATE table users_listas(
    idListaUser int auto_increment primary key,
    idLista int,
    idUser int,
    tags varchar(100),
    FOREIGN KEY (idUser) REFERENCES user_git(idUserGit),
    FOREIGN KEY (idLista) REFERENCES lista(idLista)
);
