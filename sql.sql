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
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    `nota` VARCHAR(500),
    PRIMARY KEY (`ID`)
)

CREATE TABLE `brummybd`.`Mascotas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombre` VARCHAR(50), 
    `fechaNacimiento` DATE, 
    `FK_especie` INT, 
    `especie` VARCHAR(50), 
    `raza` VARCHAR(50), 
    `FK_raza` INT,
    `sexo` VARCHAR(20), 
    `color` VARCHAR(20), 
    `rasgosParticulares` VARCHAR(255), 
    `nota` VARCHAR(500), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `fechaUlmitoMovimiento` DATETIME, 
    `motivoMovimiento` VARCHAR(50), 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
)

CREATE TABLE `brummybd`.`Especies` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombreEspecie` VARCHAR(50), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`Razas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `nombreRaza` VARCHAR(50), 
    `FK_especie` INT,
    `especie` VARCHAR(50),
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`inventario` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `codigo` VARCHAR(255), 
    `nombre` INT,
    `descripcion` VARCHAR(500), 
    `tipo` VARCHAR(50),
    `Flagtipo` VARCHAR(50),
    `precioCompra` DECIMAL(10, 2),
    `precioVenta` DECIMAL(10, 2),
    `stockMinimo` INT,
    `stockReal` INT,
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`ventaHeader` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `cliente` INT,
    `price` DECIMAL(10,2),
    `FlagExacto` BIT,
    `efectivo` DECIMAL(10,2),
    `cambio` DECIMAL(10,2),
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);


CREATE TABLE `brummybd`.`ventaDetalle` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `FKVenta` INT,
    `FKProducto` INT,
    `FlagProducto` VARCHAR(100),
    `cantidad` INT,
    `total` DECIMAL(10,2),
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

--*View vwVentasGeneral
SELECT he.ID,he.cliente,he.price,DATE(he.fechaCreacion) as Fecha, SUM(det.cantidad) as cantidad,
CONCAT(cl.nombre,' ',cl.apellidoM,' ',cl.apellidoP) as nombreCompleto FROM ventaheader he 
INNER JOIN ventadetalle det
ON he.ID = det.FKVenta
INNER JOIN clientes cl 
ON cl.ID = he.cliente
GROUP BY ID 

CREATE TABLE `brummybd`.`MotivosCitas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `motivoCita` VARCHAR(50), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`motivosrechazo` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `motivoRechazo` VARCHAR(50), 
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `estatus` BIT(1) NOT NULL DEFAULT b'1',
    PRIMARY KEY (`ID`)
);

CREATE TABLE `brummybd`.`citas` (
    `ID` INT NOT NULL AUTO_INCREMENT , 
    `FKnombreCita` INT,
    `nombreCita` VARCHAR(150), 
    `FKnombreMascota` INT,
    `nombreMascota` VARCHAR(50), 
    `fechaCita` DATE,
    `horaCita` TIME,
    `motivoCita` VARCHAR(50), 
    `comentariosCita` VARCHAR(255), 
    `FKMotivo` INT,
    `fechaCreacion` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `flagEstatus` VARCHAR(50) NOT NULL DEFAULT 'PENDIENTE', 
    `estatus` INT NOT NULL DEFAULT 1,
    PRIMARY KEY (`ID`)
);

