<?php
// 🔹 Configura tus datos de conexión:
$host = "localhost";
$usuario = "root";
$clave = ""; // normalmente vacío en XAMPP
$base_datos = "gramasysuministros";

// 🔹 Crear conexión con MySQL
$conexion = new mysqli($host, $usuario, $clave, $base_datos);

// 🔹 Verificar si hay errores
if ($conexion->connect_error) {
    http_response_code(500);
    die(json_encode([
        "error" => "Error de conexión a la base de datos: " . $conexion->connect_error
    ]));
}

// 🔹 Establecer el charset a UTF-8 para evitar problemas con acentos
$conexion->set_charset("utf8");
?>
