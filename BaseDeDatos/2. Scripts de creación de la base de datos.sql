CREATE database vianda_market_db;
USE vianda_market_db;

CREATE TABLE vianda_market_db. Usuarios (
  idUsuarios INT NOT NULL AUTO_INCREMENT,
  domicilio VARCHAR(250) NOT NULL,
  nombres VARCHAR(50) NOT NULL,
  apellidos VARCHAR(50) NOT NULL,
  correo VARCHAR(45) NOT NULL,
  contrasena VARCHAR(20) NOT NULL,
  edad INT NULL,
  PRIMARY KEY (idUsuarios)
  );

CREATE TABLE vianda_market_db.cortes (
  idcortes INT NOT NULL AUTO_INCREMENT,
  corte VARCHAR(45) NOT NULL,
  precio FLOAT NOT NULL,
  descripcion_corte VARCHAR(500) NOT NULL,
  disponibilidad TINYINT NULL,
  cantidad_disponible FLOAT NULL,
  idcalidades INT NOT NULL,
  PRIMARY KEY (idcortes),
 KEY(idcalidades));

CREATE TABLE vianda_market_db.complementos (
  idcomplementos INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(45) NOT NULL,
  disponibilidad TINYINT NOT NULL,
  cantidad_disponible DOUBLE NOT NULL,
  descripcion_complemento VARCHAR(500) NOT NULL,
  precio FLOAT NOT NULL,
  PRIMARY KEY (idcomplementos)
  );

CREATE TABLE vianda_market_db.calidades (
  idcalidades INT NOT NULL AUTO_INCREMENT,
  marca VARCHAR(45) NOT NULL,
  pais VARCHAR(45) NOT NULL,
  descripcion_marca VARCHAR(500) NOT NULL,
  calidad VARCHAR(45) NOT NULL,
  PRIMARY KEY (idcalidades)
  );

  CREATE TABLE vianda_market_db.gramos (
  idgramos INT NOT NULL auto_increment,
  gramos INT NOT NULL,
  cortes_idcortes INT,
  complementos_idcomplementos INT,
  PRIMARY KEY (idgramos)
  );