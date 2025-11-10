<?php
$host = "127.0.0.1";     
$usuario = "root";      
$clave = "";            
$bd = "gramas_y_suministros";  

$conexion = new mysqli($host, $usuario, $clave, $bd);

if ($conexion->connect_errno) {
    die("❌ Error al conectar con la base de datos: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>
