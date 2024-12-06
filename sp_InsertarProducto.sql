DELIMITER $$

CREATE PROCEDURE sp_InsertarProducto (
    IN nom VARCHAR(255),
    IN prec DECIMAL(10, 2),
    IN idtipo INT,
    IN cant INT
)
BEGIN
    DECLARE ultimo INT;
    INSERT INTO productos (nombre, precio, idTipoProducto) VALUES (nom, prec, idtipo);
    SET ultimo = LAST_INSERT_ID();
    INSERT INTO stock (cantidad, idProducto) VALUES (cant, ultimo);
END$$

DELIMITER ;


