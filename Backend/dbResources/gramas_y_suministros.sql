-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-02-2026 a las 22:57:44
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gramas_y_suministros`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del perfil administrador.',
  `id_usuario` int(10) UNSIGNED NOT NULL COMMENT 'FK -> usuario(id_usuario). Relaciona el perfil administrador con un usuario.',
  `id_rol` int(10) UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Indica el rol asociado (ej. administrador).',
  `contacto_adicional` varchar(150) DEFAULT NULL COMMENT 'Contacto extra o referencia administrativa.',
  `observaciones` text DEFAULT NULL COMMENT 'Notas propias del perfil administrador.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Perfil de administrador ligado a un usuario y a un rol.';

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id_admin`, `id_usuario`, `id_rol`, `contacto_adicional`, `observaciones`) VALUES
(1, 1, 1, '3001234567', 'Admin principal del sistema.'),
(2, 2, 1, '3017654321', 'Encargada del control de inventario.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador de categoria.',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre de la categoria (ej. grama, accesorios).',
  `descripcion` text DEFAULT NULL COMMENT 'Descripcion de la categoria.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Categorias para clasificar productos.';

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Deportiva', 'Está diseñada específicamente para resistir uso intenso en canchas de fútbol, tenis, golf y otros deportes, garantizando durabilidad, drenaje eficiente y mantenimiento mínimo sin riego ni poda.'),
(2, 'Residencial', 'Diseñado para exteriores e interiores como jardines, terrazas, balcones y zonas de mascotas.'),
(3, 'Comercial', 'Diseñado para uso intensivo en áreas exteriores e interiores como centros comerciales, oficinas, paisajismo urbano y zonas de mascotas.'),
(4, 'Decorativa', 'Diseñado para embellecer espacios residenciales y comerciales sin requerir mantenimiento constante.'),
(5, 'Eventos', 'Césped artificial diseñado para montaje temporal o permanente en ferias, exposiciones, stands, pasarelas y zonas lounge, destacando por ser estética, limpia y fácil de instalar.'),
(6, 'Suministro', 'Provisión integral de materiales y elementos necesarios para instalar césped artificial en áreas deportivas, residenciales o comerciales.'),
(7, 'Mascotas', 'Es un tipo de césped artificial diseñado específicamente para ser resistente, higiénico y seguro para perros y gatos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del perfil cliente.',
  `id_usuario` int(10) UNSIGNED NOT NULL COMMENT 'FK -> usuario(id_usuario). Relaciona el perfil cliente con un usuario (si aplica).',
  `id_rol` int(10) UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Indica el rol asociado (ej. cliente).',
  `historial_compras` int(10) UNSIGNED DEFAULT NULL COMMENT 'ID/contador referencial de historial de compras (puede mapear a pedidos si se crea).',
  `num_telefono` varchar(20) DEFAULT NULL COMMENT 'Telefono principal del cliente.',
  `direccion_facturacion` varchar(255) DEFAULT NULL COMMENT 'Direccion opcional del cliente.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Perfil de cliente ligado a un usuario y a un rol.';

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `id_usuario`, `id_rol`, `historial_compras`, `num_telefono`, `direccion_facturacion`) VALUES
(1, 3, 2, 5, '3102223344', 'Cra 12 #45-23 Sur, Bogotá'),
(2, 4, 2, 2, '3201239988', 'Cl 80 #22-10, Bogotá'),
(3, 5, 2, 0, '3007771122', 'Av 1 de Mayo #10-20, Bogotá');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrada`
--

CREATE TABLE `entrada` (
  `id_movimiento` int(10) UNSIGNED NOT NULL COMMENT 'PK y FK -> movimiento.id_movimiento. Cada entrada es un movimiento (especializacion).',
  `id_proveedor` int(10) UNSIGNED DEFAULT NULL COMMENT 'FK -> proveedor(id_proveedor). Origen de la mercancia en la entrada.',
  `precio_unitario` decimal(10,2) DEFAULT NULL COMMENT 'Precio unitario de la compra en esta entrada (uso contable/opcional).',
  `lote` varchar(100) DEFAULT NULL COMMENT 'Referencia de lote (si existiera). En este modelo simple es opcional y puede quedar NULL.',
  `observaciones` text DEFAULT NULL COMMENT 'Notas especificas de la entrada.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Especializacion de movimiento para recepciones/entradas.';

--
-- Volcado de datos para la tabla `entrada`
--

INSERT INTO `entrada` (`id_movimiento`, `id_proveedor`, `precio_unitario`, `lote`, `observaciones`) VALUES
(1, 1, 10000.00, 'KIK-2024-01', 'Entrada de 20 rollos de grama Kikuyo'),
(2, 1, 11500.00, 'BER-2024-01', 'Entrada de 15 rollos de Bermuda'),
(3, 1, 50000.00, 'SYN-2024-01', 'Compra inicial de grama sintética'),
(4, 1, 20000.00, 'ABO-2024-01', 'Lote de abono orgánico compostado'),
(5, 1, 15000.00, 'HER-2024-01', 'Entrada de tijeras GardenTools');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `movimiento`
--

CREATE TABLE `movimiento` (
  `id_movimiento` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del movimiento padre (registro comun).',
  `id_producto` int(10) UNSIGNED NOT NULL COMMENT 'FK -> producto(id_producto). Producto afectado.',
  `id_usuario` int(10) UNSIGNED NOT NULL COMMENT 'FK -> usuario(id_usuario). Usuario que registra el movimiento.',
  `fecha` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha y hora del movimiento.',
  `cantidad` int(11) NOT NULL COMMENT 'Cantidad afectada (entrada: suma; salida: resta).',
  `detalle` text DEFAULT NULL COMMENT 'Observaciones generales (referencia, doc, nota).',
  `tipo` enum('entrada','salida') DEFAULT NULL COMMENT 'Atajo informativo. Fuente de verdad: existencia de fila en entrada o salida.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Tabla padre con los atributos comunes a todas las operaciones que modifican inventario.';

--
-- Volcado de datos para la tabla `movimiento`
--

INSERT INTO `movimiento` (`id_movimiento`, `id_producto`, `id_usuario`, `fecha`, `cantidad`, `detalle`, `tipo`) VALUES
(1, 1, 1, '2025-11-21 11:51:59', 20, 'Compra inicial de grama Kikuyo', 'entrada'),
(2, 2, 1, '2025-11-21 11:51:59', 15, 'Compra inicial de grama Bermuda', 'entrada'),
(3, 3, 1, '2025-11-21 11:51:59', 10, 'Compra de grama sintética', 'entrada'),
(4, 4, 1, '2025-11-21 11:51:59', 25, 'Abono orgánico recibido', 'entrada'),
(5, 5, 2, '2025-11-21 11:51:59', 10, 'Entrada inicial de tijeras', 'entrada'),
(6, 1, 3, '2025-11-21 11:51:59', 2, 'Venta al cliente Juan Martínez', 'salida'),
(7, 2, 4, '2025-11-21 11:51:59', 1, 'Venta a Sofía Torres', 'salida'),
(8, 3, 5, '2025-11-21 11:51:59', 1, 'Venta a Andrés Ramírez', 'salida'),
(9, 4, 3, '2025-11-21 11:51:59', 3, 'Venta de abono orgánico', 'salida'),
(10, 5, 4, '2025-11-21 11:51:59', 1, 'Venta de tijeras', 'salida');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del producto. Referenciado por stock y movimiento.',
  `nombre` varchar(150) NOT NULL COMMENT 'Nombre descriptivo del producto.',
  `marca` varchar(100) DEFAULT NULL COMMENT 'Marca comercial (opcional).',
  `peso` decimal(10,2) DEFAULT NULL COMMENT 'Peso (ej. kg). DECIMAL para precision.',
  `material` varchar(100) DEFAULT NULL COMMENT 'Material del producto.',
  `descripcion` text DEFAULT NULL COMMENT 'Descripcion ampliada.',
  `precio` decimal(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Precio unitario de referencia (DECIMAL para dinero).',
  `altura` decimal(10,0) DEFAULT NULL COMMENT 'Altura/dimension relevante (opcional).',
  `id_categoria` int(10) UNSIGNED DEFAULT NULL COMMENT 'FK -> categoria(id_categoria). Categoria del producto (opcional).',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de alta del producto.',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Ultima actualizacion de datos del producto.',
  `stock` int(11) DEFAULT 0,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Catalogo de productos manejados por el inventario.';

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `marca`, `peso`, `material`, `descripcion`, `precio`, `altura`, `id_categoria`, `created_at`, `updated_at`, `stock`, `imagen`) VALUES
(1, 'Grama Sintética ProFut 50', 'GreenTurf', 2.75, 'Polietileno (PE)', 'Grama de alto rendimiento para canchas de fútbol 7 y 11, resistente a tráfico intenso y rayos UV.', 89900.00, 50, 1, '2025-11-21 11:51:59', '2026-02-16 15:44:37', 0, 'GramaSintéticaProFut50.jpg'),
(2, 'Grama Sintética HomeGarden 30', 'EcoGrass', 2.10, 'Polietileno + Polipropileno', 'Ideal para jardines residenciales, suave al tacto y con drenaje rápido.', 54500.00, 30, 2, '2025-11-21 11:51:59', '2026-02-16 15:47:40', 0, 'GramaSintéticaHomeGarden30.jpg'),
(3, 'Grama Sintética UrbanDeck 20', 'CityTurf', 1.85, 'Polipropileno (PP)', 'Diseñada para terrazas y balcones, ligera y fácil de instalar.', 42000.00, 20, 3, '2025-11-21 11:51:59', '2026-02-16 15:51:03', 0, 'GramaSintéticaUrbanDeck20.jpg'),
(4, 'Grama Sintética DecoLux 15', 'DecoGreen', 1.40, 'Fibrilado', 'Uso decorativo interior y vitrinas comerciales, acabado estético y uniforme.', 35900.00, 15, 4, '2025-11-21 11:51:59', '2026-02-16 15:24:11', 0, 'AbonoOrganico.png'),
(5, 'Grama Sintética EventPro 25', 'FastGrass', 1.95, 'Polietileno (PE)', 'Instalación rápida para ferias y eventos temporales, enrollable y reutilizable.', 48300.00, 25, 5, '2025-11-21 11:51:59', '2026-02-16 15:24:34', 0, 'GramaBermuda.png'),
(6, 'Arena Sílica Lavada', 'BuildSupplies', 25.00, 'Arena Sílica', 'Relleno para grama sintética deportiva y residencial, mejora estabilidad y drenaje.', 32000.00, NULL, 6, '2026-02-16 15:21:25', '2026-02-16 15:24:48', 0, NULL),
(7, 'Caucho Granulado', 'RubberFill', 20.00, 'Caucho reciclado SBR', 'Relleno amortiguante para canchas deportivas, reduce impacto y mejora rebote.', 75000.00, NULL, 6, '2026-02-16 15:22:22', '2026-02-16 15:24:58', 0, NULL),
(8, 'Grama PetFriendly 35', 'PetZone', 2.30, 'Polietileno Antibacteriano', 'Especial para mascotas, con sistema de drenaje reforzado y control de olores.', 67800.00, 35, 7, '2026-02-16 15:23:32', '2026-02-16 15:25:07', 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del proveedor.',
  `nombre` varchar(150) NOT NULL COMMENT 'Nombre comercial del proveedor.',
  `contacto` varchar(150) DEFAULT NULL COMMENT 'Persona de contacto en el proveedor.',
  `telefono` varchar(50) DEFAULT NULL COMMENT 'Telefono del proveedor.',
  `email` varchar(150) DEFAULT NULL COMMENT 'Email del proveedor.',
  `direccion` varchar(255) DEFAULT NULL COMMENT 'Direccion fisica (opcional).'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Proveedores que surten mercancia (usados en entradas).';

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `nombre`, `contacto`, `telefono`, `email`, `direccion`) VALUES
(1, 'Alfocentrex', 'Mary Luz Bustos', '300 567 0517', 'alfocenter@gmail.com', 'Zona Industrial, Bogotá');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id_rol` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador unico del rol. Uso: referencia en usuario.id_rol y en perfiles.',
  `tipo` enum('administrador','cliente','almacenista','otro') NOT NULL COMMENT 'Tipo/clave del rol (ej. administrador, cliente). Usado para clasificar perfiles.',
  `descripcion` varchar(255) DEFAULT NULL COMMENT 'Descripcion del rol: responsabilidades y alcance.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Fuente unica de definicion de roles del sistema.';

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id_rol`, `tipo`, `descripcion`) VALUES
(1, 'administrador', 'Encargado de gestionar el sistema, usuarios, inventario y ventas.'),
(2, 'cliente', 'Cliente del sistema que realiza compras o pedidos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salida`
--

CREATE TABLE `salida` (
  `id_movimiento` int(10) UNSIGNED NOT NULL COMMENT 'PK y FK -> movimiento.id_movimiento. Cada salida es un movimiento (especializacion).',
  `destino` varchar(150) DEFAULT NULL COMMENT 'Descripcion del receptor o destino (cliente, sucursal, obsequio).',
  `motivo` varchar(255) DEFAULT NULL COMMENT 'Motivo de salida (venta, traslado, merma).',
  `observaciones` text DEFAULT NULL COMMENT 'Notas especificas de la salida.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Especializacion de movimiento para salidas/egresos del inventario.';

--
-- Volcado de datos para la tabla `salida`
--

INSERT INTO `salida` (`id_movimiento`, `destino`, `motivo`, `observaciones`) VALUES
(6, 'Juan Martínez', 'Venta', 'Entrega de 2 rollos de grama Kikuyo'),
(7, 'Sofía Torres', 'Venta', 'Venta de 1 rollo de grama Bermuda'),
(8, 'Andrés Ramírez', 'Venta', 'Compra de grama sintética premium'),
(9, 'Juan Martínez', 'Venta', 'Venta de 3 bolsas de abono orgánico'),
(10, 'Sofía Torres', 'Venta', 'Venta de 1 tijera de podar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock`
--

CREATE TABLE `stock` (
  `id_producto` int(10) UNSIGNED NOT NULL COMMENT 'PK y FK: id_producto es PK de stock. Significa una fila de stock por producto (modelo simple y claro).',
  `cantidad_actual` int(11) NOT NULL DEFAULT 0 COMMENT 'Cantidad disponible en inventario para este producto.',
  `nivel_minimo` int(11) NOT NULL DEFAULT 0 COMMENT 'Umbral minimo para alerta/reorden.',
  `ultima_actualizacion` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Fecha/hora ultima vez que se actualizo el stock.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Estado del inventario por producto (1:1). Diseño simple porque no hay multiples bodegas ni lotes.';

--
-- Volcado de datos para la tabla `stock`
--

INSERT INTO `stock` (`id_producto`, `cantidad_actual`, `nivel_minimo`, `ultima_actualizacion`) VALUES
(1, 50, 10, '2025-11-21 11:51:59'),
(2, 30, 5, '2025-11-21 11:51:59'),
(3, 20, 5, '2025-11-21 11:51:59'),
(4, 40, 10, '2025-11-21 11:51:59'),
(5, 25, 5, '2025-11-21 11:51:59');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(10) UNSIGNED NOT NULL COMMENT 'PK: Identificador del usuario (empleado/actor del sistema).',
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre del usuario (presentacion).',
  `apellido` varchar(100) DEFAULT NULL COMMENT 'Apellido del usuario.',
  `email` varchar(150) NOT NULL COMMENT 'Email para login y contacto. UNIQUE evita cuentas duplicadas.',
  `password_hash` varchar(255) DEFAULT NULL COMMENT 'Hash de la contrasena (no guardar en claro).',
  `estado` enum('activo','inactivo','suspendido') NOT NULL DEFAULT 'activo' COMMENT 'Estado de la cuenta; permite deshabilitar sin borrar.',
  `id_rol` int(10) UNSIGNED NOT NULL COMMENT 'FK -> rol(id_rol). Rol obligatorio: asegura que todo usuario tenga permisos definidos.',
  `created_at` datetime NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de creacion del usuario.',
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Fecha ultima modificacion.',
  `reset_code` varchar(10) DEFAULT NULL,
  `reset_code_expire` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Usuarios del sistema; id_rol obligatorio para claridad en permisos.';

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `apellido`, `email`, `password_hash`, `estado`, `id_rol`, `created_at`, `updated_at`, `reset_code`, `reset_code_expire`) VALUES
(1, 'Carlos', 'Gómez', 'carlos.admin@example.com', 'hash1', 'activo', 1, '2025-11-21 11:51:58', '2025-11-21 11:51:58', NULL, NULL),
(2, 'Laura', 'Pérez', 'laura.admin@example.com', 'hash2', 'activo', 1, '2025-11-21 11:51:58', '2025-11-21 11:51:58', NULL, NULL),
(3, 'Juan', 'Martínez', 'juan.cliente@example.com', 'hash3', 'activo', 2, '2025-11-21 11:51:58', '2025-11-21 11:51:58', NULL, NULL),
(4, 'Sofía', 'Torres', 'sofia.cliente@example.com', 'hash4', 'activo', 2, '2025-11-21 11:51:58', '2025-11-21 11:51:58', NULL, NULL),
(5, 'Andrés', 'Ramírez', 'andres.cliente@example.com', 'hash5', 'activo', 2, '2025-11-21 11:51:58', '2025-11-21 11:51:58', NULL, NULL),
(6, 'Santiago', 'Rodriguez', 'santidavila233@gmail.com', '$2b$10$abnJpCCLjYYMA7Umabae2u31VwWsxIofyDYFqrIBjc2UlO5I5XTii', 'activo', 1, '2025-11-21 11:52:32', '2026-02-03 15:16:00', NULL, NULL),
(7, 'Jhon', 'Merchan', 'a@gmail.com', '$2b$10$j8PDh2nHv/uQhV1ryZ0tY.DNSdPQca7h8ZMqouwQDtR03E7VNTxOK', 'activo', 2, '2026-02-10 15:11:04', '2026-02-10 15:11:04', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `fk_admin_rol` (`id_rol`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD KEY `fk_cliente_rol` (`id_rol`);

--
-- Indices de la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `fk_entrada_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD KEY `idx_mov_fecha` (`fecha`),
  ADD KEY `idx_mov_producto` (`id_producto`),
  ADD KEY `idx_mov_usuario` (`id_usuario`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`),
  ADD KEY `fk_producto_categoria` (`id_categoria`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indices de la tabla `salida`
--
ALTER TABLE `salida`
  ADD PRIMARY KEY (`id_movimiento`);

--
-- Indices de la tabla `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del perfil administrador.', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador de categoria.', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del perfil cliente.', AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `movimiento`
--
ALTER TABLE `movimiento`
  MODIFY `id_movimiento` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del movimiento padre (registro comun).', AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del producto. Referenciado por stock y movimiento.', AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del proveedor.', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador unico del rol. Uso: referencia en usuario.id_rol y en perfiles.', AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'PK: Identificador del usuario (empleado/actor del sistema).', AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_admin_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `fk_cliente_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`),
  ADD CONSTRAINT `fk_cliente_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE;

--
-- Filtros para la tabla `entrada`
--
ALTER TABLE `entrada`
  ADD CONSTRAINT `fk_entrada_movimiento` FOREIGN KEY (`id_movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_entrada_proveedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE SET NULL;

--
-- Filtros para la tabla `movimiento`
--
ALTER TABLE `movimiento`
  ADD CONSTRAINT `fk_movimiento_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `fk_movimiento_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE SET NULL;

--
-- Filtros para la tabla `salida`
--
ALTER TABLE `salida`
  ADD CONSTRAINT `fk_salida_movimiento` FOREIGN KEY (`id_movimiento`) REFERENCES `movimiento` (`id_movimiento`) ON DELETE CASCADE;

--
-- Filtros para la tabla `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `fk_stock_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
