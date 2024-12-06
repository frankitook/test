CREATE VIEW vw_StockProducto AS
SELECT 
    p.idProducto,
    p.nombre,
    p.precio,
    tp.descripcion AS tipoProducto,
    s.cantidad
FROM 
    productos p
INNER JOIN 
    tipoproductos tp ON p.idTipoProducto = tp.idTipoProducto
INNER JOIN 
    stock s ON p.idProducto = s.idProducto;


SELECT * FROM vw_StockProducto;
