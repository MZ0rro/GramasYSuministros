-- Insertar proveedores si no existen
-- Este script verifica si los proveedores ya existen antes de insertarlos

INSERT INTO proveedor (nombre, contacto, telefono, email, direccion)
SELECT * FROM (
    SELECT 'VerdeVida S.A.S' as nombre, 'María López' as contacto, '3201112233' as telefono, 'contacto@verdevida.com' as email, 'Zona Industrial, Bogotá' as direccion
    UNION ALL
    SELECT 'EcoGrass Ltda', 'José Morales', '3102223344', 'ventas@ecograss.com', 'Calle 100 #15-30, Bogotá'
    UNION ALL
    SELECT 'PlastiCol', 'Ana Rojas', '3156789900', 'ana@plasticol.com', 'Av Boyacá #45-10, Bogotá'
    UNION ALL
    SELECT 'FertiCampo', 'Ricardo Pérez', '3129871234', 'info@ferticampo.com', 'Km 5 Vía Soacha'
    UNION ALL
    SELECT 'GreenPower', 'Lucía Torres', '3114568899', 'soporte@greenpower.com', 'Zona Franca, Bogotá'
) AS tmp
WHERE NOT EXISTS (
    SELECT 1 FROM proveedor WHERE nombre = tmp.nombre
);

-- Verificar proveedores insertados
SELECT * FROM proveedor;
