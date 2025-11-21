-- ========== Crear base y usarla ==========
CREATE DATABASE IF NOT EXISTS gramas_y_suministros
  DEFAULT CHARACTER SET = utf8mb4
  DEFAULT COLLATE = utf8mb4_general_ci;
USE gramas_y_suministros;

-- ========== Limpiar (solo en desarrollo) ==========
DROP TABLE IF EXISTS entrada;
DROP TABLE IF EXISTS salida;
DROP TABLE IF EXISTS movimiento;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS producto;
DROP TABLE IF EXISTS categoria;
DROP TABLE IF EXISTS proveedor;
DROP TABLE IF EXISTS administrador;
DROP TABLE IF EXISTS cliente;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;

-- ========== TABLA: rol ==========
CREATE TABLE rol (
  id_rol INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    COMMENT 'PK: Identificador unico del rol. Uso: referencia en usuario.id_rol y en perfiles.',
  tipo ENUM('administrador','cliente','almacenista','otro') NOT NULL
    COMMENT 'Tipo/clave del rol (ej. administrador, cliente). Usado para clasificar perfiles.',
  descripcion VARCHAR(255) DEFAULT NULL
    COMMENT 'Descripcion del rol: responsabilidades y alcance.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Fuente unica de definicion de roles del sistema.';

-- ========== TABLA: usuario (rol obligatorio) ==========
CREATE TABLE usuario (
  id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY
    COMMENT 'PK: Identificador del usuario (empleado/actor del sistema).',
  nombre VARCHAR(100) NOT NULL COMMENT 'Nombre del usuario (presentacion).',
  apellido VARCHAR(100) DEFAULT NULL COMMENT 'Apellido del usuario.',
  email VARCHAR(150) NOT NULL UNIQUE COMMENT 'Email para login y contacto. UNIQUE evita cuentas duplicadas.',
  password_hash VARCHAR(255) DEFAULT NULL COMMENT 'Hash de la contrasena (no guardar en claro).',
  estado ENUM('activo','inactivo','suspendido') NOT NULL DEFAULT 'activo' COMMENT 'Estado de la cuenta; permite deshabilitar sin borrar.',
  id_rol INT UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Rol obligatorio: asegura que todo usuario tenga permisos definidos.',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creacion del usuario.',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha ultima modificacion.',
  CONSTRAINT fk_usuario_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Usuarios del sistema; id_rol obligatorio para claridad en permisos.';

-- ========== TABLA: administrador (perfil/especializacion) ==========
CREATE TABLE administrador (
  id_admin INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador del perfil administrador.',
  id_usuario INT UNSIGNED NOT NULL UNIQUE COMMENT 'FK -> usuario(id_usuario). Relaciona el perfil administrador con un usuario.',
  id_rol INT UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Indica el rol asociado (ej. administrador).',
  contacto_adicional VARCHAR(150) DEFAULT NULL COMMENT 'Contacto extra o referencia administrativa.',
  observaciones TEXT DEFAULT NULL COMMENT 'Notas propias del perfil administrador.',
  CONSTRAINT fk_admin_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  CONSTRAINT fk_admin_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Perfil de administrador ligado a un usuario y a un rol.';

-- ========== TABLA: cliente (perfil/especializacion) ==========
CREATE TABLE cliente (
  id_cliente INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador del perfil cliente.',
  id_usuario INT UNSIGNED NOT NULL UNIQUE COMMENT 'FK -> usuario(id_usuario). Relaciona el perfil cliente con un usuario (si aplica).',
  id_rol INT UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Indica el rol asociado (ej. cliente).',
  historial_compras INT UNSIGNED DEFAULT NULL COMMENT 'ID/contador referencial de historial de compras (puede mapear a pedidos si se crea).',
  num_telefono VARCHAR(20) DEFAULT NULL COMMENT 'Telefono principal del cliente.',
  direccion_facturacion VARCHAR(255) DEFAULT NULL COMMENT 'Direccion opcional del cliente.',
  CONSTRAINT fk_cliente_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  CONSTRAINT fk_cliente_rol FOREIGN KEY (id_rol) REFERENCES rol(id_rol) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Perfil de cliente ligado a un usuario y a un rol.';

-- ========== TABLA: proveedor ==========
CREATE TABLE proveedor (
  id_proveedor INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador del proveedor.',
  nombre VARCHAR(150) NOT NULL COMMENT 'Nombre comercial del proveedor.',
  contacto VARCHAR(150) DEFAULT NULL COMMENT 'Persona de contacto en el proveedor.',
  telefono VARCHAR(50) DEFAULT NULL COMMENT 'Telefono del proveedor.',
  email VARCHAR(150) DEFAULT NULL COMMENT 'Email del proveedor.',
  direccion VARCHAR(255) DEFAULT NULL COMMENT 'Direccion fisica (opcional).'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Proveedores que surten mercancia (usados en entradas).';

-- ========== TABLA: categoria ==========
CREATE TABLE categoria (
  id_categoria INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador de categoria.',
  nombre VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nombre de la categoria (ej. grama, accesorios).',
  descripcion TEXT DEFAULT NULL COMMENT 'Descripcion de la categoria.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Categorias para clasificar productos.';

-- ========== TABLA: producto ==========
CREATE TABLE producto (
  id_producto INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador del producto. Referenciado por stock y movimiento.',
  nombre VARCHAR(150) NOT NULL COMMENT 'Nombre descriptivo del producto.',
  marca VARCHAR(100) DEFAULT NULL COMMENT 'Marca comercial (opcional).',
  peso DECIMAL(10,3) DEFAULT NULL COMMENT 'Peso (ej. kg). DECIMAL para precision.',
  material VARCHAR(100) DEFAULT NULL COMMENT 'Material del producto.',
  descripcion TEXT DEFAULT NULL COMMENT 'Descripcion ampliada.',
  precio DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Precio unitario de referencia (DECIMAL para dinero).',
  altura DECIMAL(10,2) DEFAULT NULL COMMENT 'Altura/dimension relevante (opcional).',
  id_categoria INT UNSIGNED DEFAULT NULL COMMENT 'FK -> categoria(id_categoria). Categoria del producto (opcional).',
  stock INT DEFAULT 0 COMMENT 'Cantidad que se encuentra disponible del producto.',
  imagen VARCHAR(255) COMMENT 'Imagen representativa del producto.',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de alta del producto.',
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Ultima actualizacion de datos del producto.',
  CONSTRAINT fk_producto_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Catalogo de productos manejados por el inventario.';

-- ========== TABLA: stock (UNA FILA POR PRODUCTO) ==========
CREATE TABLE stock (
  id_producto INT UNSIGNED NOT NULL PRIMARY KEY
    COMMENT 'PK y FK: id_producto es PK de stock. Significa una fila de stock por producto (modelo simple y claro).',
  cantidad_actual INT NOT NULL DEFAULT 0 COMMENT 'Cantidad disponible en inventario para este producto.',
  nivel_minimo INT NOT NULL DEFAULT 0 COMMENT 'Umbral minimo para alerta/reorden.',
  ultima_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha/hora ultima vez que se actualizo el stock.',
  CONSTRAINT fk_stock_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Estado del inventario por producto (1:1). Diseño simple porque no hay multiples bodegas ni lotes.';

-- ========== TABLA: movimiento (PADRE) ==========
CREATE TABLE movimiento (
  id_movimiento INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'PK: Identificador del movimiento padre (registro comun).',
  id_producto INT UNSIGNED NOT NULL COMMENT 'FK -> producto(id_producto). Producto afectado.',
  id_usuario INT UNSIGNED NOT NULL COMMENT 'FK -> usuario(id_usuario). Usuario que registra el movimiento.',
  fecha DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora del movimiento.',
  cantidad INT NOT NULL COMMENT 'Cantidad afectada (entrada: suma; salida: resta).',
  detalle TEXT DEFAULT NULL COMMENT 'Observaciones generales (referencia, doc, nota).',
  tipo ENUM('entrada','salida') DEFAULT NULL COMMENT 'Atajo informativo. Fuente de verdad: existencia de fila en entrada o salida.',
  CONSTRAINT fk_movimiento_producto FOREIGN KEY (id_producto) REFERENCES producto(id_producto) ON DELETE RESTRICT,
  CONSTRAINT fk_movimiento_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE RESTRICT,
  INDEX idx_mov_fecha (fecha),
  INDEX idx_mov_producto (id_producto),
  INDEX idx_mov_usuario (id_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Tabla padre con los atributos comunes a todas las operaciones que modifican inventario.';

-- ========== TABLA: entrada (Hija) ==========
CREATE TABLE entrada (
  id_movimiento INT UNSIGNED PRIMARY KEY
    COMMENT 'PK y FK -> movimiento.id_movimiento. Cada entrada es un movimiento (especializacion).',
  id_proveedor INT UNSIGNED DEFAULT NULL COMMENT 'FK -> proveedor(id_proveedor). Origen de la mercancia en la entrada.',
  precio_unitario DECIMAL(10,2) DEFAULT NULL COMMENT 'Precio unitario de la compra en esta entrada (uso contable/opcional).',
  lote VARCHAR(100) DEFAULT NULL COMMENT 'Referencia de lote (si existiera). En este modelo simple es opcional y puede quedar NULL.',
  observaciones TEXT DEFAULT NULL COMMENT 'Notas especificas de la entrada.',
  CONSTRAINT fk_entrada_movimiento FOREIGN KEY (id_movimiento) REFERENCES movimiento(id_movimiento) ON DELETE CASCADE,
  CONSTRAINT fk_entrada_proveedor FOREIGN KEY (id_proveedor) REFERENCES proveedor(id_proveedor) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Especializacion de movimiento para recepciones/entradas.';

-- ========== TABLA: salida (Hija) ==========
CREATE TABLE salida (
  id_movimiento INT UNSIGNED PRIMARY KEY
    COMMENT 'PK y FK -> movimiento.id_movimiento. Cada salida es un movimiento (especializacion).',
  destino VARCHAR(150) DEFAULT NULL COMMENT 'Descripcion del receptor o destino (cliente, sucursal, obsequio).',
  motivo VARCHAR(255) DEFAULT NULL COMMENT 'Motivo de salida (venta, traslado, merma).',
  observaciones TEXT DEFAULT NULL COMMENT 'Notas especificas de la salida.',
  CONSTRAINT fk_salida_movimiento FOREIGN KEY (id_movimiento) REFERENCES movimiento(id_movimiento) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT = 'Especializacion de movimiento para salidas/egresos del inventario.';
  
  
-- ========================================================================================================================================= INSERTS
  
-- ==============================================
-- ROL
-- ==============================================
INSERT INTO rol (tipo, descripcion)
VALUES 
('administrador', 'Encargado de gestionar el sistema, usuarios, inventario y ventas.'),
('cliente', 'Cliente del sistema que realiza compras o pedidos.');

-- ==============================================
-- USUARIO
-- ==============================================
INSERT INTO usuario (nombre, apellido, email, password_hash, estado, id_rol)
VALUES
('Carlos', 'Gómez', 'carlos.admin@example.com', 'hash1', 'activo', 1),
('Laura', 'Pérez', 'laura.admin@example.com', 'hash2', 'activo', 1),
('Juan', 'Martínez', 'juan.cliente@example.com', 'hash3', 'activo', 2),
('Sofía', 'Torres', 'sofia.cliente@example.com', 'hash4', 'activo', 2),
('Andrés', 'Ramírez', 'andres.cliente@example.com', 'hash5', 'activo', 2);

-- ==============================================
-- ADMINISTRADOR
-- ==============================================
INSERT INTO administrador (id_usuario, id_rol, contacto_adicional, observaciones)
VALUES
(1, 1, '3001234567', 'Admin principal del sistema.'),
(2, 1, '3017654321', 'Encargada del control de inventario.');

-- ==============================================
-- CLIENTE
-- ==============================================
INSERT INTO cliente (id_usuario, id_rol, historial_compras, num_telefono, direccion_facturacion)
VALUES
(3, 2, 5, '3102223344', 'Cra 12 #45-23 Sur, Bogotá'),
(4, 2, 2, '3201239988', 'Cl 80 #22-10, Bogotá'),
(5, 2, 0, '3007771122', 'Av 1 de Mayo #10-20, Bogotá');

-- ==============================================
-- PROVEEDOR
-- ==============================================
INSERT INTO proveedor (nombre, contacto, telefono, email, direccion)
VALUES
('VerdeVida S.A.S', 'María López', '3201112233', 'contacto@verdevida.com', 'Zona Industrial, Bogotá'),
('EcoGrass Ltda', 'José Morales', '3102223344', 'ventas@ecograss.com', 'Calle 100 #15-30, Bogotá'),
('PlastiCol', 'Ana Rojas', '3156789900', 'ana@plasticol.com', 'Av Boyacá #45-10, Bogotá'),
('FertiCampo', 'Ricardo Pérez', '3129871234', 'info@ferticampo.com', 'Km 5 Vía Soacha'),
('GreenPower', 'Lucía Torres', '3114568899', 'soporte@greenpower.com', 'Zona Franca, Bogotá');

-- ==============================================
-- CATEGORIA
-- ==============================================
INSERT INTO categoria (nombre, descripcion)
VALUES
('Grama natural', 'Tipos de grama viva para jardines y canchas.'),
('Grama sintética', 'Rollos de césped artificial para exteriores e interiores.'),
('Abonos', 'Fertilizantes y abonos orgánicos.'),
('Herramientas', 'Herramientas y utensilios de jardinería.'),
('Accesorios', 'Complementos de instalación o mantenimiento.');

-- ==============================================
-- PRODUCTO
-- ==============================================
INSERT INTO producto (nombre, marca, peso, material, descripcion, precio, altura, id_categoria)
VALUES
('Grama Kikuyo', 'GreenField', 25.000, 'Natural', 'Grama resistente ideal para zonas frías.', 12000.00, 2.50, 1),
('Grama Bermuda', 'EcoGrass', 20.000, 'Natural', 'Grama de rápido crecimiento para climas cálidos.', 13500.00, 2.30, 1),
('Grama sintética premium', 'TurfPro', 10.000, 'Sintética', 'Césped artificial de alta densidad y durabilidad.', 58000.00, 3.00, 2),
('Abono orgánico compostado', 'FertiCampo', 15.000, 'Orgánico', 'Abono natural para mejorar la calidad del suelo.', 25000.00, NULL, 3),
('Tijeras de podar', 'GardenTools', 0.500, 'Acero inoxidable', 'Tijeras ergonómicas para jardinería.', 18000.00, NULL, 4);

-- ==============================================
-- STOCK
-- ==============================================
INSERT INTO stock (id_producto, cantidad_actual, nivel_minimo)
VALUES
(1, 50, 10),
(2, 30, 5),
(3, 20, 5),
(4, 40, 10),
(5, 25, 5);

-- ==============================================
-- MOVIMIENTO
-- ==============================================
INSERT INTO movimiento (id_producto, id_usuario, fecha, cantidad, detalle, tipo)
VALUES
(1, 1, NOW(), 20, 'Compra inicial de grama Kikuyo', 'entrada'),
(2, 1, NOW(), 15, 'Compra inicial de grama Bermuda', 'entrada'),
(3, 1, NOW(), 10, 'Compra de grama sintética', 'entrada'),
(4, 1, NOW(), 25, 'Abono orgánico recibido', 'entrada'),
(5, 2, NOW(), 10, 'Entrada inicial de tijeras', 'entrada'),
(1, 3, NOW(), 2, 'Venta al cliente Juan Martínez', 'salida'),
(2, 4, NOW(), 1, 'Venta a Sofía Torres', 'salida'),
(3, 5, NOW(), 1, 'Venta a Andrés Ramírez', 'salida'),
(4, 3, NOW(), 3, 'Venta de abono orgánico', 'salida'),
(5, 4, NOW(), 1, 'Venta de tijeras', 'salida');

-- ==============================================
-- ENTRADA (Hijas de movimiento tipo entrada: id_movimiento 1–5)
-- ==============================================
INSERT INTO entrada (id_movimiento, id_proveedor, precio_unitario, lote, observaciones)
VALUES
(1, 1, 10000.00, 'KIK-2024-01', 'Entrada de 20 rollos de grama Kikuyo'),
(2, 2, 11500.00, 'BER-2024-01', 'Entrada de 15 rollos de Bermuda'),
(3, 2, 50000.00, 'SYN-2024-01', 'Compra inicial de grama sintética'),
(4, 4, 20000.00, 'ABO-2024-01', 'Lote de abono orgánico compostado'),
(5, 5, 15000.00, 'HER-2024-01', 'Entrada de tijeras GardenTools');

-- ==============================================
-- SALIDA (Hijas de movimiento tipo salida: id_movimiento 6–10)
-- ==============================================
INSERT INTO salida (id_movimiento, destino, motivo, observaciones)
VALUES
(6, 'Juan Martínez', 'Venta', 'Entrega de 2 rollos de grama Kikuyo'),
(7, 'Sofía Torres', 'Venta', 'Venta de 1 rollo de grama Bermuda'),
(8, 'Andrés Ramírez', 'Venta', 'Compra de grama sintética premium'),
(9, 'Juan Martínez', 'Venta', 'Venta de 3 bolsas de abono orgánico'),
(10, 'Sofía Torres', 'Venta', 'Venta de 1 tijera de podar');