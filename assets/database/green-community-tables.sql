CREATE DATABASE GreenComm;
USE GreenComm;

CREATE TABLE Usuario (
  idUsuario int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  email varchar(70) NOT NULL UNIQUE,
  senha varchar(70) NOT NULL,
  dataNascimento DATE,
  telefone varchar(20)
);

CREATE TABLE Proprietario (
  idProprietario INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  email VARCHAR(70) NOT NULL UNIQUE,
  senha VARCHAR(70) NOT NULL,
  dataNascimento DATE,
  telefone VARCHAR(20),
  endereco VARCHAR(50)
);

CREATE TABLE Terreno (
  idTerreno INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  fk_Proprietario_idPropretario INT,
  endereco VARCHAR(45),
  cep INT,
  cidade VARCHAR(45),
  estado VARCHAR(45),
  horta BOOLEAN,
  status VARCHAR(20),
  prazo DATE
);