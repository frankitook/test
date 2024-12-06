CREATE DATABASE test;

USE test;

CREATE TABLE tipoproductos(
idTipoProducto INT AUTO_INCREMENT PRIMARY KEY,
descripcion VARCHAR(255) NOT NULL
);

CREATE TABLE productos(
idProducto INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255) NOT NULL,
precio DECIMAL(10,2) NOT NULL,
idTipoProducto INT NOT NULL,
FOREIGN KEY (idTipoProducto) REFERENCES tipoProductos(idTipoProducto)
);

CREATE TABLE stock ( 
idStock INT AUTO_INCREMENT PRIMARY KEY, 
cantidad INT NOT NULL, 
idProducto INT NOT NULL, 
FOREIGN KEY (idProducto) REFERENCES Productos(idProducto) 
);

