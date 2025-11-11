<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include("conexion.php"); // 👈 se conecta a la base de datos

$sql = "SELECT * FROM producto";
$resultado = $conexion->query($sql);
$productos = [];

if ($resultado && $resultado->num_rows > 0) {
  while ($row = $resultado->fetch_assoc()) {
    $productos[] = $row;
  }
}

echo json_encode($productos, JSON_UNESCAPED_UNICODE);
?>
