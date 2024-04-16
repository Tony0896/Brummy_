CREATE TABLE `brummybd`.`Clientes` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(20), 
    `apellidoP` VARCHAR(20), 
    `apellidoM` VARCHAR(20), 
    `telefono` VARCHAR(20), 
    `correo` VARCHAR(100), 
    `fechaCreacion`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `fechaUlmitoMovimiento` DATETIME, 
    `motivoMovimiento` VARCHAR(50), 
    PRIMARY KEY (`ID`)
)

ALTER TABLE `clientes` ADD `estatus` BIT(1) NOT NULL DEFAULT b'1' AFTER `motivoMovimiento`;