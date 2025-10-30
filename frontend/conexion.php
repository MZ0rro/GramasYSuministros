<?php
$host = "127.0.0.1";     // o "localhost"
$usuario = "root";       // usuario por defecto en XAMPP
$clave = "";              // contraseña vacía por defecto
$bd = "gramas_y_suministros";  // nombre exacto de tu base de datos

$conexion = new mysqli($host, $usuario, $clave, $bd);

// Validar conexión
if ($conexion->connect_errno) {
    die("❌ Error al conectar con la base de datos: " . $conexion->connect_error);
}

// Codificación UTF-8
$conexion->set_charset("utf8");
?>
