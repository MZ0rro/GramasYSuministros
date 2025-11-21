-- Consultas de Muñoz

-- 1. Mostrar todos los usuarios activos
SELECT * FROM usuario WHERE estado = 'activo';

-- 2. Mostrar nombre y email de los usuarios inactivos
SELECT nombre, apellido, email FROM usuario WHERE estado = 'inactivo';

-- 3. Mostrar los productos cuyo precio sea mayor a 30.000
SELECT nombre, precio FROM producto WHERE precio > 30000;

-- 4. Mostrar los productos con stock menor al nivel mínimo
SELECT p.nombre, s.cantidad_actual, s.nivel_minimo
FROM producto p
JOIN stock s ON p.id_producto = s.id_producto
WHERE s.cantidad_actual < s.nivel_minimo;

-- 5. Listar todos los clientes con más de 10 compras
SELECT c.id_cliente, r.descripcion, c.historial_compras
FROM cliente c
JOIN rol r ON c.id_rol = r.id_rol
WHERE c.historial_compras > 10;

-- 6. Mostrar las categorías con más de 20 palabras en su descripción
SELECT id_categoria, nombre FROM categoria
WHERE LENGTH(descripcion) > 100;

-- 7. Mostrar los nombres de los usuarios ordenados alfabéticamente
SELECT nombre, apellido FROM usuario ORDER BY nombre ASC;

-- 8. Mostrar los 3 productos más caros
SELECT nombre, precio FROM producto ORDER BY precio DESC LIMIT 3;

-- 9. Mostrar los productos que no tienen stock registrado
SELECT p.nombre
FROM producto p
LEFT JOIN stock s ON p.id_producto = s.id_producto
WHERE s.id_producto IS NULL;

-- 10. Mostrar los usuarios que pertenecen al rol de “administrador”
SELECT u.nombre, u.apellido, r.tipo
FROM usuario u
JOIN rol r ON u.id_rol = r.id_rol
WHERE r.tipo = 'administrador';



-- Consultas de Brandon

-- 11. Mostrar el nombre del producto y su categoría
SELECT p.nombre AS producto, c.nombre AS categoria
FROM producto p
JOIN categoria c ON p.id_categoria = c.id_categoria;

-- 12. Mostrar los movimientos con nombre del producto y usuario
SELECT m.id_movimiento, p.nombre AS producto, u.nombre AS usuario, m.tipo, m.cantidad
FROM movimiento m
JOIN producto p ON m.id_producto = p.id_producto
JOIN usuario u ON m.id_usuario = u.id_usuario;

-- 13. Mostrar el proveedor de cada entrada
SELECT e.id_movimiento, pr.nombre AS proveedor, e.precio_unitario
FROM entrada e
JOIN proveedor pr ON e.id_proveedor = pr.id_proveedor;

-- 14. Mostrar la cantidad total de productos por categoría
SELECT c.nombre AS categoria, COUNT(p.id_producto) AS total_productos
FROM categoria c
LEFT JOIN producto p ON c.id_categoria = p.id_categoria
GROUP BY c.id_categoria;

-- 15. Mostrar los usuarios y el tipo de rol que tienen
SELECT u.nombre, u.apellido, r.tipo
FROM usuario u
JOIN rol r ON u.id_rol = r.id_rol;

-- 16. Mostrar las salidas con nombre del producto y destino
SELECT s.id_movimiento, p.nombre AS producto, s.destino
FROM salida s
JOIN movimiento m ON s.id_movimiento = m.id_movimiento
JOIN producto p ON m.id_producto = p.id_producto;

-- 17. Mostrar los movimientos de tipo “entrada” con su proveedor
SELECT m.id_movimiento, p.nombre AS producto, pr.nombre AS proveedor, e.lote
FROM movimiento m
JOIN entrada e ON m.id_movimiento = e.id_movimiento
JOIN proveedor pr ON e.id_proveedor = pr.id_proveedor
JOIN producto p ON m.id_producto = p.id_producto
WHERE m.tipo = 'entrada';

-- 18. Mostrar los movimientos realizados por usuarios activos
SELECT m.*, u.nombre, u.estado
FROM movimiento m
JOIN usuario u ON m.id_usuario = u.id_usuario
WHERE u.estado = 'activo';

-- 19. Mostrar todos los productos y su cantidad actual de stock
SELECT p.nombre, s.cantidad_actual
FROM producto p
JOIN stock s ON p.id_producto = s.id_producto;

-- 20. Mostrar productos que pertenecen a la categoría “Gramas”
SELECT p.nombre, c.nombre AS categoria
FROM producto p
JOIN categoria c ON p.id_categoria = c.id_categoria
WHERE c.nombre = 'Gramas';



-- Consultas de Molina

-- 21. Calcular el precio promedio de los productos
SELECT AVG(precio) AS precio_promedio FROM producto;

-- 22. Calcular la suma total del stock
SELECT SUM(cantidad_actual) AS total_stock FROM stock;

-- 23. Mostrar la cantidad de usuarios por estado
SELECT estado, COUNT(*) AS total FROM usuario GROUP BY estado;

-- 24. Mostrar el producto más caro
SELECT nombre, precio FROM producto
WHERE precio = (SELECT MAX(precio) FROM producto);

-- 25. Mostrar la cantidad de movimientos de tipo “entrada” y “salida”
SELECT tipo, COUNT(*) AS total FROM movimiento GROUP BY tipo;

-- 26. Calcular el promedio de compras de los clientes
SELECT AVG(historial_compras) AS promedio_compras FROM cliente;

-- 27. Mostrar cuántos productos tiene cada categoría
SELECT c.nombre, COUNT(p.id_producto) AS total
FROM categoria c
LEFT JOIN producto p ON c.id_categoria = p.id_categoria
GROUP BY c.id_categoria;

-- 28. Mostrar cuántos usuarios tiene cada tipo de rol
SELECT r.tipo, COUNT(u.id_usuario) AS total
FROM rol r
LEFT JOIN usuario u ON r.id_rol = u.id_rol
GROUP BY r.tipo;

-- 29. Mostrar el precio mínimo y máximo de productos
SELECT MIN(precio) AS menor_precio, MAX(precio) AS mayor_precio FROM producto;

-- 30. Calcular el promedio de cantidad por movimiento
SELECT AVG(cantidad) AS promedio_cantidad FROM movimiento;

-- Consultas de Santiago

-- 31. Mostrar productos cuyo precio esté por encima del promedio
SELECT nombre, precio FROM producto
WHERE precio > (SELECT AVG(precio) FROM producto);

-- 32. Mostrar usuarios que han realizado movimientos
SELECT * FROM usuario
WHERE id_usuario IN (SELECT id_usuario FROM movimiento);

-- 33. Mostrar proveedores que han tenido entradas registradas
SELECT * FROM proveedor
WHERE id_proveedor IN (SELECT id_proveedor FROM entrada);

-- 34. Mostrar los movimientos con cantidad mayor al promedio general
SELECT * FROM movimiento
WHERE cantidad > (SELECT AVG(cantidad) FROM movimiento);

-- 35. Mostrar las categorías que no tienen productos
SELECT * FROM categoria
WHERE id_categoria NOT IN (SELECT id_categoria FROM producto);

-- 36. Mostrar los productos sin movimiento de salida
SELECT * FROM producto
WHERE id_producto NOT IN (
    SELECT m.id_producto FROM movimiento m WHERE m.tipo = 'salida'
);

-- 37. Mostrar los clientes sin historial de compras
SELECT * FROM cliente WHERE historial_compras = 0;

-- 38. Mostrar los productos con más de un movimiento registrado
SELECT p.nombre, COUNT(m.id_movimiento) AS total_movimientos
FROM producto p
JOIN movimiento m ON p.id_producto = m.id_producto
GROUP BY p.id_producto
HAVING COUNT(m.id_movimiento) > 1;

-- 39. Mostrar los administradores que no tienen usuarios asociados
SELECT * FROM administrador
WHERE id_rol NOT IN (SELECT id_rol FROM usuario);

-- 40. Mostrar los usuarios con rol de cliente que están activos
SELECT u.nombre, r.tipo
FROM usuario u
JOIN rol r ON u.id_rol = r.id_rol
WHERE r.tipo = 'cliente' AND u.estado = 'activo';

-- Consultas de Jhojan

-- 41. Actualizar el estado de un usuario a 'suspendido'
UPDATE usuario SET estado = 'suspendido' WHERE id_usuario = 4;

-- 42. Incrementar el stock de un producto en 10 unidades
UPDATE stock SET cantidad_actual = cantidad_actual + 10 WHERE id_producto = 1;

-- 43. Cambiar el precio de todos los productos de la categoría 'Gramas' en +10%
UPDATE producto p
JOIN categoria c ON p.id_categoria = c.id_categoria
SET p.precio = p.precio * 1.10
WHERE c.nombre = 'Gramas';

-- 44. Marcar como 'inactivo' los usuarios sin movimientos
UPDATE usuario SET estado = 'inactivo'
WHERE id_usuario NOT IN (SELECT id_usuario FROM movimiento);

-- 45. Eliminar movimientos antiguos (solo ejemplo)
DELETE FROM movimiento WHERE fecha < DATE_SUB(NOW(), INTERVAL 1 YEAR);

-- 46. Aumentar el nivel mínimo de stock en 5 unidades para todos los productos
UPDATE stock SET nivel_minimo = nivel_minimo + 5;

-- 47. Renombrar la categoría “Suministros” a “Materiales de Jardinería”
UPDATE categoria SET nombre = 'Materiales de Jardinería' WHERE nombre = 'Suministros';

-- 48. Eliminar clientes sin historial de compras
DELETE FROM cliente WHERE historial_compras = 0;

-- 49. Mostrar productos modificados en el último mes
SELECT * FROM producto
WHERE updated_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);

-- 50. Mostrar los 5 productos con más stock disponible
SELECT p.nombre, s.cantidad_actual
FROM producto p
JOIN stock s ON p.id_producto = s.id_producto
ORDER BY s.cantidad_actual DESC
LIMIT 5;