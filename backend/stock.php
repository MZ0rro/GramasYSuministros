<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexion.php"); // 👈 se conecta a la base de datos

// 🔹 Unimos las tablas producto y stock
$sql = "SELECT p.*, s.cantidad_actual AS stock
        FROM producto p
        LEFT JOIN stock s ON p.id_producto = s.id_producto";

$resultado = $conexion->query($sql);
$productos = [];

if ($resultado && $resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $productos[] = $row;
    }
}

echo json_encode($productos, JSON_UNESCAPED_UNICODE);
?>
