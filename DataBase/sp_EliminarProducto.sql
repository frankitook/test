DELIMITER $$

CREATE PROCEDURE sp_EliminarProducto (
    IN idprod INT
)
BEGIN
    DELETE FROM stock WHERE idProducto = idprod;
    DELETE FROM productos WHERE idProducto = idprod;
END$$

DELIMITER ;
