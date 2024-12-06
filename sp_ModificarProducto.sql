DELIMITER $$

CREATE PROCEDURE sp_ModificarProducto (
    IN idprod INT,
    IN nom VARCHAR(255),
    IN prec DECIMAL(10, 2),
    IN idtipo INT,
    IN cant INT
)
BEGIN
    UPDATE productos
    SET nombre = nom, precio = prec, idTipoProducto = idtipo
    WHERE idProducto = idprod;
    
    UPDATE stock
    SET cantidad = cant
    WHERE idProducto = idprod;
END$$

DELIMITER ;
